import { relations } from "drizzle-orm";
import { departments } from "../tables/departments";
import { documents } from "../tables/documents";
import { users } from "../tables/users";
import { documentAccess } from "../tables/documentAccess";

export const documentsRelations = relations(documents, ({ one, many }) => ({
  department: one(departments, {
    fields: [documents.departmentId],
    references: [departments.id],
  }),
  uploadedBy: one(users, {
    fields: [documents.uploadedById],
    references: [users.id],
  }),
  accessLogs: many(documentAccess),
}));
