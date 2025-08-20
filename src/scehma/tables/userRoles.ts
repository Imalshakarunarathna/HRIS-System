import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { roles } from "./roles";
import { departments } from "./departments";

export const userRoles = pgTable("user_roles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  roleId: integer("role_id")
    .references(() => roles.id)
    .notNull(),
  departmentId: integer("department_id").references(() => departments.id),
  assignedAt: timestamp("assigned_at").defaultNow(),
});
