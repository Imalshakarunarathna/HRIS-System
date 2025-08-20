import { relations } from "drizzle-orm";
import { employee } from "../tables/employee";
import { attendance } from "../tables/attendance";

export const attendanceRelations = relations(attendance, ({ one }) => ({
  employee: one(employee, {
    fields: [attendance.employeeId],
    references: [employee.id],
  }),
}));
