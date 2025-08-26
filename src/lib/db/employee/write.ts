"use server";

import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { EmployeeFormData } from "@/lib/types/employee";
import { employee } from "@/scehma/tables/employee";

export interface EmployeeResult {
  success: boolean;
  message: string;
  employeeId?: number;
  error?: unknown;
}

export async function createEmployee(
  data: EmployeeFormData
): Promise<EmployeeResult> {
  try {
    const newEmployees = await db
      .insert(employee)
      .values({
        employeeId: data.employeeId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        jobTitle: data.jobTitle,
        department: data.department,
        reportingManager: data.reportingManager,
        hireDate: data.hireDate,
        employmentStatus: data.employmentStatus,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        address: data.address,
      })
      .returning();

    const newEmployee = newEmployees[0];

    revalidatePath("/employee");
    revalidatePath("/");

    return {
      success: true,
      message: "Employee created successfully",
      employeeId: newEmployee.id,
    };
  } catch (error) {
    console.error("Error creating employee:", error);
    return {
      success: false,
      message: "Failed to create employee. Please try again.",
      error,
    };
  }
}

export async function updateEmployee(
  id: number,
  data: EmployeeFormData
): Promise<EmployeeResult> {
  try {
    await db
      .update(employee)
      .set({
        employeeId: data.employeeId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        jobTitle: data.jobTitle,
        department: data.department,
        reportingManager: data.reportingManager,
        hireDate: data.hireDate,
        employmentStatus: data.employmentStatus,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        address: data.address,
        updatedAt: new Date(),
      })
      .where(eq(employee.id, id));

    revalidatePath("/employee");
    revalidatePath("/");

    return {
      success: true,
      message: "Employee updated successfully",
      employeeId: id,
    };
  } catch (error) {
    console.error("Error updating employee:", error);
    return {
      success: false,
      message: "Failed to update employee. Please try again.",
      error,
    };
  }
}

export async function deleteEmployee(id: number): Promise<EmployeeResult> {
  try {
    await db.delete(employee).where(eq(employee.id, id));

    revalidatePath("/employee");
    revalidatePath("/");

    return {
      success: true,
      message: "Employee deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting employee:", error);
    return {
      success: false,
      message: "Failed to delete employee. Please try again.",
      error,
    };
  }
}
