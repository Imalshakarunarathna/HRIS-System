import { relations } from "drizzle-orm";
import { users } from "../tables/users";
import { invoices } from "../tables/invoices";
import { departments } from "../tables/departments";

export const invoicesRelations = relations(invoices, ({ one }) => ({
  createdBy: one(users, {
    fields: [invoices.createdById],
    references: [users.id],
  }),
  department: one(departments, {
    fields: [invoices.departmentId],
    references: [departments.id],
  }),
}));
