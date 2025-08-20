import {
  decimal,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { departments } from "./departments";

export const employee = pgTable("employees", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  employeeId: text("employee_id").notNull().unique(),
  departmentId: integer("department_id")
    .references(() => departments.id)
    .notNull(),
  supervisorId: integer("supervisor_id"),
  position: text("position").notNull(),
  hireDate: timestamp("hire_date").notNull(),
  salary: decimal("salary", { precision: 10, scale: 2 }),
  status: text("status").notNull().default("active"), // active, inactive, terminated
  workLocation: text("work_location"),
  phoneNumber: text("phone_number"),
  emergencyContact: jsonb("emergency_contact"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
