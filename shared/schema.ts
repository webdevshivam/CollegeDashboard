import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const faculty = pgTable("faculty", {
  id: serial("id").primaryKey(),
  facultyId: text("faculty_id").notNull().unique(),
  name: text("name").notNull(),
  department: text("department").notNull(),
  designation: text("designation").notNull(),
  gender: text("gender").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const banners = pgTable("banners", {
  id: serial("id").primaryKey(),
  bannerId: text("banner_id").notNull().unique(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  priority: integer("priority").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  newsId: text("news_id").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  importance: text("importance").notNull(), // high, medium, low
  link: text("link"),
  publishDate: timestamp("publish_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const ipr = pgTable("ipr", {
  id: serial("id").primaryKey(),
  iprId: text("ipr_id").notNull().unique(),
  year: text("year").notNull(),
  grantNo: text("grant_no").notNull(),
  affiliation: text("affiliation").notNull(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const managementTeam = pgTable("management_team", {
  id: serial("id").primaryKey(),
  managementId: text("management_id").notNull().unique(),
  name: text("name").notNull(),
  branch: text("branch").notNull(),
  designation: text("designation").notNull(),
  mobileNo: text("mobile_no").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cellsCommittees = pgTable("cells_committees", {
  id: serial("id").primaryKey(),
  cellId: text("cell_id").notNull().unique(),
  name: text("name").notNull(),
  pdfUrl: text("pdf_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  galleryId: text("gallery_id").notNull().unique(),
  year: text("year").notNull(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertFacultySchema = createInsertSchema(faculty).pick({
  facultyId: true,
  name: true,
  department: true,
  designation: true,
  gender: true,
});

export const insertBannerSchema = createInsertSchema(banners).pick({
  bannerId: true,
  title: true,
  imageUrl: true,
  priority: true,
  isActive: true,
});

export const insertNewsSchema = createInsertSchema(news).pick({
  newsId: true,
  title: true,
  description: true,
  importance: true,
  link: true,
});

export const insertIprSchema = createInsertSchema(ipr).pick({
  iprId: true,
  year: true,
  grantNo: true,
  affiliation: true,
  title: true,
});

export const insertManagementTeamSchema = createInsertSchema(managementTeam).pick({
  managementId: true,
  name: true,
  branch: true,
  designation: true,
  mobileNo: true,
});

export const insertCellsCommitteesSchema = createInsertSchema(cellsCommittees).pick({
  cellId: true,
  name: true,
  pdfUrl: true,
});

export const insertGallerySchema = createInsertSchema(gallery).pick({
  galleryId: true,
  year: true,
  category: true,
  title: true,
  imageUrl: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Faculty = typeof faculty.$inferSelect;
export type InsertFaculty = z.infer<typeof insertFacultySchema>;

export type Banner = typeof banners.$inferSelect;
export type InsertBanner = z.infer<typeof insertBannerSchema>;

export type News = typeof news.$inferSelect;
export type InsertNews = z.infer<typeof insertNewsSchema>;

export type Ipr = typeof ipr.$inferSelect;
export type InsertIpr = z.infer<typeof insertIprSchema>;

export type ManagementTeam = typeof managementTeam.$inferSelect;
export type InsertManagementTeam = z.infer<typeof insertManagementTeamSchema>;

export type CellsCommittees = typeof cellsCommittees.$inferSelect;
export type InsertCellsCommittees = z.infer<typeof insertCellsCommitteesSchema>;

export type Gallery = typeof gallery.$inferSelect;
export type InsertGallery = z.infer<typeof insertGallerySchema>;
