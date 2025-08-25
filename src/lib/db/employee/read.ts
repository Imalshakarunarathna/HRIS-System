import { db } from "@/lib/db";
import { employee } from "@/scehma/tables/employee";
import { eq, like, or } from "drizzle-orm";
import type { Employee } from "@/lib/types/employee";

export async function getAllEmployees(): Promise<Employee[]> {
  try {
    const employees = await db.select().from(employee);
    return employees.map((emp) => ({
      id: emp.id,
      employeeId: emp.employeeId,
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      jobTitle: emp.jobTitle,
      department: emp.department,
      reportingManager: emp.reportingManager || "",
      hireDate: emp.hireDate,
      employmentStatus: emp.employmentStatus as
        | "Active"
        | "Inactive"
        | "Terminated",
      phoneNumber: emp.phoneNumber || "",
      dateOfBirth: emp.dateOfBirth || "",
      gender: emp.gender || "",
      address: emp.address || "",
      createdAt: emp.createdAt ?? undefined,
      updatedAt: emp.updatedAt ?? undefined,
    }));
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
}

export async function getEmployeeById(
  id: number
): Promise<{ success: boolean; employee?: Employee; error?: string }> {
  try {
    const [employeeData] = await db
      .select()
      .from(employee)
      .where(eq(employee.id, id));

    if (!employeeData) {
      return {
        success: false,
        error: "Employee not found",
      };
    }

    const emp: Employee = {
      id: employeeData.id,
      employeeId: employeeData.employeeId,
      firstName: employeeData.firstName,
      lastName: employeeData.lastName,
      email: employeeData.email,
      jobTitle: employeeData.jobTitle,
      department: employeeData.department,
      reportingManager: employeeData.reportingManager || "",
      hireDate: employeeData.hireDate,
      employmentStatus: employeeData.employmentStatus as
        | "Active"
        | "Inactive"
        | "Terminated",
      phoneNumber: employeeData.phoneNumber || "",
      dateOfBirth: employeeData.dateOfBirth || "",
      gender: employeeData.gender || "",
      address: employeeData.address || "",
      createdAt: employeeData.createdAt ?? undefined,
      updatedAt: employeeData.updatedAt ?? undefined,
    };

    return {
      success: true,
      employee: emp,
    };
  } catch (error) {
    console.error("Error fetching employee:", error);
    return {
      success: false,
      error: "Failed to fetch employee",
    };
  }
}
