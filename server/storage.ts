import { 
  users, committees, registrations, teamMembers, events, galleryImages,
  type User, type InsertUser,
  type Committee, type InsertCommittee,
  type Registration, type InsertRegistration,
  type TeamMember, type InsertTeamMember,
  type Event, type InsertEvent,
  type GalleryImage, type InsertGalleryImage
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User>;

  // Committees
  getCommittees(): Promise<Committee[]>;
  getCommittee(id: number): Promise<Committee | undefined>;
  createCommittee(committee: InsertCommittee): Promise<Committee>;

  // Registrations
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  getRegistration(id: number): Promise<Registration | undefined>;
  getRegistrationByCode(code: string): Promise<Registration | undefined>;
  updateRegistration(id: number, registration: Partial<InsertRegistration>): Promise<Registration>;
  getRegistrations(): Promise<(Registration & { user: User })[]>;

  // Team
  getTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;

  // Events
  getEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;

  // Gallery
  getGalleryImages(): Promise<GalleryImage[]>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User> {
    const [updated] = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return updated;
  }

  // Committees
  async getCommittees(): Promise<Committee[]> {
    return await db.select().from(committees);
  }

  async getCommittee(id: number): Promise<Committee | undefined> {
    const [committee] = await db.select().from(committees).where(eq(committees.id, id));
    return committee;
  }

  async createCommittee(committee: InsertCommittee): Promise<Committee> {
    const [newCommittee] = await db.insert(committees).values(committee).returning();
    return newCommittee;
  }

  // Registrations
  async createRegistration(registration: InsertRegistration): Promise<Registration> {
    const [newRegistration] = await db.insert(registrations).values(registration).returning();
    return newRegistration;
  }

  async getRegistration(id: number): Promise<Registration | undefined> {
    const [registration] = await db.select().from(registrations).where(eq(registrations.id, id));
    return registration;
  }

  async getRegistrationByCode(code: string): Promise<Registration | undefined> {
    const [registration] = await db.select().from(registrations).where(eq(registrations.uniqueCode, code));
    return registration;
  }

  async updateRegistration(id: number, updates: Partial<InsertRegistration>): Promise<Registration> {
    const [updated] = await db.update(registrations).set(updates).where(eq(registrations.id, id)).returning();
    return updated;
  }

  async getRegistrations(): Promise<(Registration & { user: User })[]> {
    const results = await db.select().from(registrations).leftJoin(users, eq(registrations.userId, users.id));
    
    return results
      .filter((row): row is { registrations: Registration; users: User } => !!row.users)
      .map((row) => ({
        ...row.registrations,
        user: row.users,
      }));
  }

  // Team
  async getTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers).orderBy(teamMembers.order);
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [newMember] = await db.insert(teamMembers).values(member).returning();
    return newMember;
  }

  // Events
  async getEvents(): Promise<Event[]> {
    return await db.select().from(events).orderBy(events.date);
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [newEvent] = await db.insert(events).values(event).returning();
    return newEvent;
  }

  // Gallery
  async getGalleryImages(): Promise<GalleryImage[]> {
    return await db.select().from(galleryImages).orderBy(desc(galleryImages.createdAt));
  }

  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const [newImage] = await db.insert(galleryImages).values(image).returning();
    return newImage;
  }
}

export const storage = new DatabaseStorage();
