import { relations } from "drizzle-orm";
import { employee } from "../tables/employee";
import { leaveRequests } from "../tables/leaveRequests";

export const leaveRequestsRelations = relations(leaveRequests, ({ one }) => ({
  employee: one(employee, {
    fields: [leaveRequests.employeeId],
    references: [employee.id],
  }),
  approvedBy: one(employee, {
    fields: [leaveRequests.approvedById],
    references: [employee.id],
  }),
}));
