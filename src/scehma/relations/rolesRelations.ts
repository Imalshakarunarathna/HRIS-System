import { relations } from "drizzle-orm";
import { roles } from "../tables/roles";
import { userRoles } from "../tables/userRoles";

export const rolesRelations = relations(roles, ({ many }) => ({
  userRoles: many(userRoles),
}));
