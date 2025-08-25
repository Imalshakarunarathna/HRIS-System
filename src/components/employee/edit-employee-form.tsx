"use client";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { EmployeeFormData, Employee } from "@/lib/types/employee";
import { toast } from "sonner";
import { updateEmployee } from "@/lib/db/employee/write";

interface EditEmployeeFormProps {
  employee: Employee;
}

export function EditEmployeeForm({ employee }: EditEmployeeFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstName: employee.firstName || "",
    lastName: employee.lastName || "",
    email: employee.email || "",
    employeeId: employee.employeeId || "",
    jobTitle: employee.jobTitle || "",
    department: employee.department || "",
    reportingManager: employee.reportingManager || "",
    hireDate: employee.hireDate || "",
    employmentStatus: employee.employmentStatus || "Active",
    phoneNumber: employee.phoneNumber || "",
    dateOfBirth: employee.dateOfBirth || "",
    gender: employee.gender || "",
    address: employee.address || "",
  });
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const result = await updateEmployee(employee.id, formData);

      if (result.success) {
        toast.success("Employee updated successfully");
        router.push("/employee");
      } else {
        toast.error(result.message || "Failed to update employee");
      }
    } catch (error) {
      console.error("[v0] Error updating employee:", error);
      toast.error("An unexpected error occurred while updating the employee.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/employee");
  };

  return (
    <MainLayout
      title="Edit Employee"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-[#6366F1] hover:bg-[#5B5CF6] text-white"
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg border-b border-blue-500 pb-2">
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                First Name
              </Label>
              <Input
                value={formData.firstName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                placeholder="First Name"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Last Name
              </Label>
              <Input
                value={formData.lastName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                }
                placeholder="Last Name"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Date of Birth
              </Label>
              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    dateOfBirth: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Gender
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, gender: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Address
              </Label>
              <Input
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
                placeholder="Address"
              />
            </div>
          </CardContent>
        </Card>

        {/* Job Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Job Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Employee ID
              </Label>
              <Input
                value={formData.employeeId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    employeeId: e.target.value,
                  }))
                }
                placeholder="Employee ID"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Job Title
              </Label>
              <Input
                value={formData.jobTitle}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))
                }
                placeholder="Job Title"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Department
              </Label>
              <Select
                value={formData.department}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, department: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Start Date
              </Label>
              <Input
                type="date"
                value={formData.hireDate}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, hireDate: e.target.value }))
                }
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Employment Status
              </Label>
              <Select
                value={formData.employmentStatus}
                onValueChange={(value: "Active" | "Inactive" | "Terminated") =>
                  setFormData((prev) => ({ ...prev, employmentStatus: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Terminated">Terminated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
                placeholder="Phone Number"
              />
            </div>
          </CardContent>
        </Card>

        {/* Department Assignment */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Department Assignment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Reporting Manager
              </Label>
              <Select
                value={formData.reportingManager}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, reportingManager: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Reporting Manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                  <SelectItem value="John Doe">John Doe</SelectItem>
                  <SelectItem value="Sarah Wilson">Sarah Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Email Address"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
