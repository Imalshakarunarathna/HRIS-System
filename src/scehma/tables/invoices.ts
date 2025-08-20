import {
  decimal,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { departments } from "./departments";

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  invoiceNumber: text("invoice_number").notNull().unique(),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email"),
  description: text("description"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  status: text("status").notNull().default("draft"), // draft, sent, paid, overdue, cancelled
  issueDate: timestamp("issue_date").notNull(),
  dueDate: timestamp("due_date").notNull(),
  paidDate: timestamp("paid_date"),
  createdById: integer("created_by")
    .references(() => users.id)
    .notNull(),
  departmentId: integer("department_id").references(() => departments.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
