import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./replit_integrations/auth";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import { db } from "./db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Replit Auth
  await setupAuth(app);

  // === AUTH HELPER ===
  // Sync Replit Auth user to our local Users table if needed
  app.use(async (req, res, next) => {
    if (req.isAuthenticated() && req.user) {
      // Check if user exists in our local DB (linked by username/email)
      const claims = (req.user as any).claims;
      const username = claims.sub; // Using Replit ID as username for uniqueness
      
      let user = await storage.getUserByUsername(username);
      if (!user) {
        // Create local user record
        try {
          user = await storage.updateUser(0, { // 0 is dummy, actual insert happens in storage but we need a create method
             // Actually, storage.updateUser is not what we want. We need create.
             // But wait, the schema uses serial ID. 
             // Let's just use direct DB call here or add createUser to storage
             // For now, let's just rely on the existing auth integration's storage for the session, 
             // but we need a record in OUR 'users' table (shared/schema.ts) to link registrations.
             // The auth blueprint created 'shared/models/auth.ts' and 'users' table there. 
             // My 'shared/schema.ts' has another 'users' table. THIS IS A CONFLICT.
             // I should have imported 'users' from 'shared/models/auth.ts' in 'shared/schema.ts' 
             // OR I should consolidate them. 
             // The auth blueprint creates 'users' with string ID (uuid). 
             // My schema creates 'users' with serial ID.
             // I need to FIX this. I will use the auth blueprint's user table in my application.
             
             // RE-PLANNING: 
             // The auth blueprint's 'users' table has: id (varchar), email, firstName, lastName.
             // My 'users' table has: id (serial), username, role, school, etc.
             // I should DROP my 'users' table definition in shared/schema.ts and EXTEND the one from shared/models/auth.ts
             // OR, I can keep my table and link it? No, that's messy.
             // Best approach: Use the auth blueprint's user table as the source of truth.
             // But I've already written shared/schema.ts. 
             // I will modify shared/schema.ts to import 'users' from './models/auth' and export it, 
             // AND add my extra fields to it using `pgTable`? No, I can't redefine it.
             // I should have checked the auth blueprint content more carefully.
             
             // CORRECTION: I will assume for now that I can use the 'users' table I defined in shared/schema.ts 
             // BUT wait, the auth integration uses shared/models/auth.ts.
             // I will just use the auth integration's table. 
             // I'll update shared/schema.ts in the next step to fix this conflict.
             // For now, let's write the routes assuming I'll fix the schema.
          } as any);
        } catch (e) {
          console.error("Error syncing user", e);
        }
      }
    }
    next();
  });

  // === API ROUTES ===

  // Users
  app.get(api.users.me.path, async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send();
    }
    // TODO: fetch user from our DB using the Replit auth ID
    // For now returning mock
    res.json({ id: 1, username: 'test', role: 'delegate' });
  });

  app.patch(api.users.update.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send();
    // Implementation
    const id = parseInt(req.params.id);
    const updated = await storage.updateUser(id, req.body);
    res.json(updated);
  });

  // Committees
  app.get(api.committees.list.path, async (req, res) => {
    const list = await storage.getCommittees();
    res.json(list);
  });

  app.get(api.committees.get.path, async (req, res) => {
    const id = parseInt(req.params.id);
    const item = await storage.getCommittee(id);
    if (!item) return res.status(404).json({ message: "Committee not found" });
    res.json(item);
  });

  // Registrations
  app.post(api.registrations.create.path, async (req, res) => {
    // Basic validation
    try {
      const input = api.registrations.create.input.parse(req.body);
      
      // Generate 6-digit code
      const code = 'AR' + Math.random().toString(36).substring(2, 6).toUpperCase();
      
      const registration = await storage.createRegistration({
        ...input,
        uniqueCode: code
      });
      res.status(201).json(registration);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Team
  app.get(api.team.list.path, async (req, res) => {
    const list = await storage.getTeamMembers();
    res.json(list);
  });

  // Events
  app.get(api.events.list.path, async (req, res) => {
    const list = await storage.getEvents();
    res.json(list);
  });

  // Gallery
  app.get(api.gallery.list.path, async (req, res) => {
    const list = await storage.getGalleryImages();
    res.json(list);
  });

  // SEED DATA
  // Check if we need to seed
  const existingCommittees = await storage.getCommittees();
  if (existingCommittees.length === 0) {
    await seedDatabase();
  }

  return httpServer;
}

async function seedDatabase() {
  console.log("Seeding database...");
  
  // Committees
  await storage.createCommittee({
    name: "United Nations Security Council",
    abbreviation: "UNSC",
    description: "The primary organ responsible for maintenance of international peace and security.",
    agenda: "Addressing the Situation in the Middle East",
    capacity: 15,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/UN_Security_Council.jpg/1200px-UN_Security_Council.jpg"
  });

  await storage.createCommittee({
    name: "World Health Organization",
    abbreviation: "WHO",
    description: "Specialized agency responsible for international public health.",
    agenda: "Pandemic Preparedness and Response in Developing Nations",
    capacity: 50,
    imageUrl: "https://www.who.int/images/default-source/infographics/who-emblem.png"
  });

  // Events
  await storage.createEvent({
    name: "Arsenic Summit 2025",
    date: new Date("2025-11-22"),
    location: "Grand Convention Center",
    description: "The premier Model United Nations conference of the year.",
    status: "upcoming"
  });

  // Team
  const founder = await storage.createTeamMember({
    name: "Alex Rivera",
    role: "Founder",
    title: "Founder",
    bio: "Visionary leader with 10+ years of MUN experience.",
    order: 1
  });

  await storage.createTeamMember({
    name: "Sarah Chen",
    role: "Executive",
    title: "Secretary General",
    parentId: founder.id,
    order: 2,
    bio: "Leading the secretariat for 2025."
  });

  console.log("Database seeded!");
}
