import { relations } from "drizzle-orm";
import { users } from "../tables/users";
import { userRoles } from "../tables/userRoles";
import { employee } from "../tables/employee";

export const usersRelations = relations(users, ({ many, one }) => ({
  userRoles: many(userRoles),
  employee: one(employee, {
    fields: [users.id],
    references: [employee.employeeId],
  }),
}));
