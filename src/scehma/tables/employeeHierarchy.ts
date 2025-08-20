import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { employee } from "./employee";

export const employeeHierarchy = pgTable("employee_hierarchy", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id")
    .references(() => employee.id)
    .notNull(),
  supervisorId: integer("supervisor_id")
    .references(() => employee.id)
    .notNull(),
  level: integer("level").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow(),
});
