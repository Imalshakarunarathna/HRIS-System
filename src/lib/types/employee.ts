// lib/types/employee.ts
export interface Employee {
  id: number;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  department: string;
  reportingManager: string;
  hireDate: string;
  employmentStatus: "Active" | "Inactive" | "Terminated";
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  employeeId: string;
  jobTitle: string;
  department: string;
  reportingManager: string;
  hireDate: string;
  employmentStatus: "Active" | "Inactive" | "Terminated";
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
}
