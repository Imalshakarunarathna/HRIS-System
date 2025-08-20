import { relations } from "drizzle-orm";
import { employee } from "../tables/employee";
import { users } from "../tables/users";
import { departments } from "../tables/departments";
import { leaveRequests } from "../tables/leaveRequests";
import { attendance } from "../tables/attendance";

export const employeeRelations = relations(employee, ({ one, many }) => ({
  user: one(users, {
    fields: [employee.userId],
    references: [users.id],
  }),
  department: one(departments, {
    fields: [employee.departmentId],
    references: [departments.id],
  }),
  supervisor: one(employee, {
    fields: [employee.supervisorId],
    references: [employee.id],
  }),
  subordinates: many(employee),
  leaveRequests: many(leaveRequests),
  attendance: many(attendance),
}));
