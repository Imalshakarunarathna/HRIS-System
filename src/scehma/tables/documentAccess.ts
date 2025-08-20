import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { documents } from "./documents";
import { users } from "./users";

export const documentAccess = pgTable("document_access", {
  id: serial("id").primaryKey(),
  documentId: integer("document_id")
    .references(() => documents.id)
    .notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  action: text("action").notNull(),
  accessedAt: timestamp("accessed_at").defaultNow(),
  ipAddress: text("ip_address"),
});
