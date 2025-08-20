import { relations } from "drizzle-orm";
import { employee } from "../tables/employee";
import { documents } from "../tables/documents";
import { userRoles } from "../tables/userRoles";
import { departments } from "../tables/departments";

export const departmentsRelations = relations(departments, ({ many }) => ({
  employees: many(employee),
  documents: many(documents),
  userRoles: many(userRoles),
}));
