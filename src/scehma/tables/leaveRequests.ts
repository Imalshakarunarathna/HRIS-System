import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { employee } from "./employee";

export const leaveRequests = pgTable("leave_requests", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id")
    .references(() => employee.id)
    .notNull(),
  leaveType: text("leave_type").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  days: integer("days").notNull(),
  reason: text("reason"),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  approvedById: integer("approved_by").references(() => employee.id),
  approvedAt: timestamp("approved_at"),
  comments: text("comments"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
