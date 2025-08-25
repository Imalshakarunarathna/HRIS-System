import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  date,
} from "drizzle-orm/pg-core";

export const employee = pgTable("employees", {
  id: serial("id").primaryKey(),
  employeeId: varchar("employee_id", { length: 50 }).notNull().unique(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  jobTitle: varchar("job_title", { length: 100 }).notNull(),
  department: varchar("department", { length: 100 }).notNull(),
  reportingManager: varchar("reporting_manager", { length: 100 }),
  hireDate: date("hire_date").notNull(),
  employmentStatus: varchar("employment_status", { length: 20 })
    .notNull()
    .default("Active"),
  phoneNumber: varchar("phone_number", { length: 20 }),
  dateOfBirth: date("date_of_birth"),
  gender: varchar("gender", { length: 10 }),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
