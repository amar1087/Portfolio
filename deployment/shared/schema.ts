import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const portfolioData = pgTable("portfolio_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(), // 'skill', 'experience', 'project', 'certification'
  title: text("title").notNull(),
  description: text("description"),
  company: text("company"),
  location: text("location"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  technologies: jsonb("technologies").$type<string[]>(),
  achievements: jsonb("achievements").$type<string[]>(),
  category: text("category"),
  priority: integer("priority").default(0),
});

export const contactInfo = pgTable("contact_info", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  title: text("title").notNull(),
  email: text("email").notNull(),
  location: text("location").notNull(),
  linkedin: text("linkedin"),
  website: text("website"),
  bio: text("bio"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPortfolioDataSchema = createInsertSchema(portfolioData).omit({
  id: true,
});

export const insertContactInfoSchema = createInsertSchema(contactInfo).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type PortfolioData = typeof portfolioData.$inferSelect;
export type InsertPortfolioData = z.infer<typeof insertPortfolioDataSchema>;
export type ContactInfo = typeof contactInfo.$inferSelect;
export type InsertContactInfo = z.infer<typeof insertContactInfoSchema>;
