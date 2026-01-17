import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// === USERS ===
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(), // Replit Auth username or email
  password: text("password"), // Optional if using only external auth, but good to have for local
  fullName: text("full_name"),
  email: text("email"),
  phoneNumber: text("phone_number"),
  role: text("role").default("delegate"), // 'delegate', 'admin', 'team'
  school: text("school"),
  grade: text("grade"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });

// === COMMITTEES ===
export const committees = pgTable("committees", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  abbreviation: text("abbreviation").notNull(),
  description: text("description").notNull(),
  agenda: text("agenda").notNull(),
  guideUrl: text("guide_url"), // URL to background guide PDF
  chairName: text("chair_name"),
  chairBio: text("chair_bio"),
  chairImageUrl: text("chair_image_url"),
  capacity: integer("capacity").default(50),
  imageUrl: text("image_url"),
});

export const insertCommitteeSchema = createInsertSchema(committees).omit({ id: true });

// === REGISTRATIONS ===
export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(), // Link to users table
  committeeId: integer("committee_id"), // Assigned committee (optional initially)
  preferences: jsonb("preferences").$type<{
    committee1: string;
    committee2: string;
    committee3: string;
    countryPreference?: string;
  }>(),
  status: text("status").default("pending"), // 'pending', 'approved', 'rejected'
  paymentStatus: text("payment_status").default("unpaid"), // 'unpaid', 'paid'
  uniqueCode: text("unique_code"), // 6-digit code
  dietaryRestrictions: text("dietary_restrictions"),
  emergencyContact: text("emergency_contact"),
  tshirtSize: text("tshirt_size"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRegistrationSchema = createInsertSchema(registrations).omit({ 
  id: true, 
  createdAt: true,
  uniqueCode: true // Generated on server
});

// === TEAM MEMBERS ===
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(), // 'Founder', 'Executive', 'HOD', 'Secretariat'
  title: text("title").notNull(), // e.g. 'Secretary General'
  bio: text("bio"),
  department: text("department"), // For HODs/Secretariat
  imageUrl: text("image_url"),
  socialLinks: jsonb("social_links").$type<{ linkedin?: string; instagram?: string }>(),
  parentId: integer("parent_id"), // For hierarchy (e.g. Secretariat -> HOD)
  order: integer("order").default(0), // For display order
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true });

// === EVENTS (for "Upcoming Events" and "Past Conferences" grouping) ===
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  date: timestamp("date").notNull(),
  location: text("location"),
  description: text("description"),
  status: text("status").default("upcoming"), // 'upcoming', 'past'
  imageUrl: text("image_url"),
});

export const insertEventSchema = createInsertSchema(events).omit({ id: true });

// === GALLERY ===
export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id"), // Optional link to specific event
  url: text("url").notNull(),
  caption: text("caption"),
  category: text("category"), // 'Opening Ceremony', 'Committee Sessions', etc.
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertGalleryImageSchema = createInsertSchema(galleryImages).omit({ id: true, createdAt: true });

// === RELATIONS ===
export const registrationRelations = relations(registrations, ({ one }) => ({
  user: one(users, {
    fields: [registrations.userId],
    references: [users.id],
  }),
  committee: one(committees, {
    fields: [registrations.committeeId],
    references: [committees.id],
  }),
}));

export const userRelations = relations(users, ({ many }) => ({
  registrations: many(registrations),
}));

export const teamRelations = relations(teamMembers, ({ one, many }) => ({
  parent: one(teamMembers, {
    fields: [teamMembers.parentId],
    references: [teamMembers.id],
    relationName: "team_hierarchy"
  }),
  children: many(teamMembers, {
    relationName: "team_hierarchy"
  })
}));

// === TYPES ===
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Committee = typeof committees.$inferSelect;
export type InsertCommittee = z.infer<typeof insertCommitteeSchema>;

export type Registration = typeof registrations.$inferSelect;
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;

export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
