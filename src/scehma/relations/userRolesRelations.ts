import { relations } from "drizzle-orm";
import { users } from "../tables/users";
import { userRoles } from "../tables/userRoles";
import { roles } from "../tables/roles";
import { departments } from "../tables/departments";

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
  department: one(departments, {
    fields: [userRoles.departmentId],
    references: [departments.id],
  }),
}));
