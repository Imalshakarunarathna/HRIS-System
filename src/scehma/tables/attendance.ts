import {
  decimal,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { employee } from "./employee";

export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id")
    .references(() => employee.id)
    .notNull(),
  date: timestamp("date").notNull(),
  clockIn: timestamp("clock_in"),
  clockOut: timestamp("clock_out"),
  breakTime: integer("break_time"), // in minutes
  totalHours: decimal("total_hours", { precision: 4, scale: 2 }),
  status: text("status").notNull().default("present"), // present, absent, late, half-day
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});
