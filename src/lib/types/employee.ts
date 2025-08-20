export interface Employee {
  id: string;
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
  avatar?: string;
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
