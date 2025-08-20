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
import { Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Employee, EmployeeFormData } from "@/lib/types/employee";

export default function EmployeeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstName: "",
    lastName: "",
    email: "",
    employeeId: "",
    jobTitle: "",
    department: "",
    reportingManager: "",
    hireDate: "",
    employmentStatus: "Active",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
  });

  useEffect(() => {
    // Mock employee data - in real app, fetch from API
    const mockEmployee: Employee = {
      id: params.id as string,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@company.com",
      employeeId: "Wele 1223",
      jobTitle: "Software Engineer",
      department: "Engineering",
      reportingManager: "Jane Smith",
      hireDate: "2023-01-15",
      employmentStatus: "Active",
      phoneNumber: "Pepis Setiod",
      dateOfBirth: "1990-05-15",
      gender: "Male",
      address: "123 Main St, City, State",
    };

    setEmployee(mockEmployee);
    setFormData({
      firstName: mockEmployee.firstName,
      lastName: mockEmployee.lastName,
      email: mockEmployee.email,
      employeeId: mockEmployee.employeeId,
      jobTitle: mockEmployee.jobTitle,
      department: mockEmployee.department,
      reportingManager: mockEmployee.reportingManager,
      hireDate: mockEmployee.hireDate,
      employmentStatus: mockEmployee.employmentStatus,
      phoneNumber: mockEmployee.phoneNumber,
      dateOfBirth: mockEmployee.dateOfBirth,
      gender: mockEmployee.gender,
      address: mockEmployee.address,
    });
  }, [params.id]);

  const handleSave = async () => {
    console.log("Saving employee data:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (employee) {
      setFormData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        employeeId: employee.employeeId,
        jobTitle: employee.jobTitle,
        department: employee.department,
        reportingManager: employee.reportingManager,
        hireDate: employee.hireDate,
        employmentStatus: employee.employmentStatus,
        phoneNumber: employee.phoneNumber,
        dateOfBirth: employee.dateOfBirth,
        gender: employee.gender,
        address: employee.address,
      });
    }
    setIsEditing(false);
  };

  if (!employee) {
    return (
      <MainLayout title="Loading...">Loading employee details...</MainLayout>
    );
  }

  return (
    <MainLayout
      title="Employee Information"
      actions={
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-[#6366F1] hover:bg-[#5B5CF6] text-white"
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-[#6366F1] hover:bg-[#5B5CF6] text-white"
            >
              Edit
            </Button>
          )}
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
                Date of Birth
              </Label>
              {isEditing ? (
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
              ) : (
                <p className="text-sm text-gray-900 mt-1">
                  {employee.dateOfBirth}
                </p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Gender
              </Label>
              {isEditing ? (
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
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <Select value={employee.gender} disabled>
                    <SelectTrigger className="w-16 h-6 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                  </Select>
                </div>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Gender
              </Label>
              <p className="text-sm text-gray-900 mt-1">Dender</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Validation
              </Label>
              {isEditing ? (
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Validation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Validation" />
                  </SelectTrigger>
                </Select>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Address
              </Label>
              {isEditing ? (
                <Input
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />
              ) : (
                <p className="text-sm text-gray-900 mt-1">{employee.address}</p>
              )}
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
              <Label className="text-sm font-medium text-gray-700">Name</Label>
              {isEditing ? (
                <Input
                  value={`${formData.firstName} ${formData.lastName}`}
                  onChange={(e) => {
                    const [firstName, ...lastNameParts] =
                      e.target.value.split(" ");
                    setFormData((prev) => ({
                      ...prev,
                      firstName: firstName || "",
                      lastName: lastNameParts.join(" ") || "",
                    }));
                  }}
                />
              ) : (
                <p className="text-sm text-gray-900 mt-1">
                  {employee.firstName} {employee.lastName}
                </p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Employee ID
              </Label>
              {isEditing ? (
                <Input
                  value={formData.employeeId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      employeeId: e.target.value,
                    }))
                  }
                />
              ) : (
                <p className="text-sm text-gray-900 mt-1">
                  {employee.employeeId}
                </p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Job Title
              </Label>
              {isEditing ? (
                <Select
                  value={formData.jobTitle}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, jobTitle: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Job Title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Software Engineer">
                      Software Engineer
                    </SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    value={employee.jobTitle}
                    disabled
                    className="text-sm"
                  />
                  <span className="text-red-500">*</span>
                </div>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Job Title
              </Label>
              <p className="text-sm text-gray-900 mt-1">Job Title</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Start Date
              </Label>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <Input
                    type="date"
                    value={formData.hireDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        hireDate: e.target.value,
                      }))
                    }
                  />
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    24
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900">Dart date</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    24
                  </span>
                </div>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Employment Status
              </Label>
              {isEditing ? (
                <Select
                  value={formData.employmentStatus}
                  onValueChange={(
                    value: "Active" | "Inactive" | "Terminated"
                  ) =>
                    setFormData((prev) => ({
                      ...prev,
                      employmentStatus: value,
                    }))
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
              ) : (
                <Select value={employee.employmentStatus} disabled>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </Select>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                />
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <Select value={employee.phoneNumber} disabled>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Department Assignment */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Employee ID</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Employee ID
              </Label>
              <p className="text-sm text-gray-900 mt-1">
                {employee.employeeId}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Department Assignment
              </Label>
              {isEditing ? (
                <Select
                  value={formData.reportingManager}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      reportingManager: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Reporting Manager" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                    <SelectItem value="John Doe">John Doe</SelectItem>
                    <SelectItem value="Sarah Wilson">Sarah Wilson</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Select value={employee.reportingManager} disabled>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </Select>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Reporting Manager
              </Label>
              <p className="text-sm text-gray-900 mt-1">Reporg Saticer</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              {isEditing ? (
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              ) : (
                <Input value={employee.email} disabled />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
