import { EditEmployeeForm } from "@/components/employee/edit-employee-form";
import { getEmployeeById } from "@/lib/db/employee/read";
import { notFound } from "next/navigation";

interface EditEmployeePageProps {
  params: {
    id: string;
  };
}

export default async function EditEmployeePage({
  params,
}: EditEmployeePageProps) {
  const employeeId = await Number.parseInt(params.id);

  if (isNaN(employeeId)) {
    notFound();
  }

  const result = await getEmployeeById(employeeId);

  if (!result.success || !result.employee) {
    notFound();
  }

  return <EditEmployeeForm employee={result.employee} />;
}
