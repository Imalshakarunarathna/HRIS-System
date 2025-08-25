import { EmployeeManagementPage } from "@/components/employee/employee-management";
import { MainLayout } from "@/components/main-layout";
import { getAllEmployees } from "@/lib/db/employee/read";

export default async function EmployeePage() {
  const employees = await getAllEmployees();
  return (
    <MainLayout title="Employee Management">
      <EmployeeManagementPage employees={employees} />
    </MainLayout>
  );
}
