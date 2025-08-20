"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Plus, Trash2, Users } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Employee } from "@/lib/types/employee";

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const [employees] = useState<Employee[]>([
    {
      id: "1",
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@company.com",
      employeeId: "EMP001",
      jobTitle: "Manager",
      department: "Manager",
      reportingManager: "John Smith",
      hireDate: "2020-05-15",
      employmentStatus: "Active",
      phoneNumber: "+1234567890",
      dateOfBirth: "1990-03-15",
      gender: "Female",
      address: "123 Main St, City, State",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson2@company.com",
      employeeId: "EMP002",
      jobTitle: "Manager",
      department: "Manager",
      reportingManager: "John Smith",
      hireDate: "2020-05-15",
      employmentStatus: "Active",
      phoneNumber: "+1234567891",
      dateOfBirth: "1988-07-22",
      gender: "Female",
      address: "456 Oak Ave, City, State",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      firstName: "Marketing",
      lastName: "Specialist",
      email: "marketing@company.com",
      employeeId: "EMP003",
      jobTitle: "Marketing Specialist",
      department: "Sales",
      reportingManager: "Sarah Wilson",
      hireDate: "2020-05-01",
      employmentStatus: "Active",
      phoneNumber: "+1234567892",
      dateOfBirth: "1992-11-08",
      gender: "Male",
      address: "789 Pine Rd, City, State",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      firstName: "Bob",
      lastName: "Williams",
      email: "bob.williams@company.com",
      employeeId: "EMP004",
      jobTitle: "Sales Representative",
      department: "Sales",
      reportingManager: "Mike Davis",
      hireDate: "2021-09-01",
      employmentStatus: "Active",
      phoneNumber: "+1234567893",
      dateOfBirth: "1985-12-03",
      gender: "Male",
      address: "321 Elm St, City, State",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      firstName: "Bob",
      lastName: "Williams",
      email: "bob.williams2@company.com",
      employeeId: "EMP005",
      jobTitle: "Representative",
      department: "Representative",
      reportingManager: "Lisa Brown",
      hireDate: "2021-09-01",
      employmentStatus: "Active",
      phoneNumber: "+1234567894",
      dateOfBirth: "1987-04-18",
      gender: "Male",
      address: "654 Maple Dr, City, State",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]);

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || employee.department === departmentFilter;
    const matchesStatus =
      statusFilter === "all" || employee.employmentStatus === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleSelectEmployee = (employeeId: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map((emp) => emp.id));
    }
  };

  return (
    <MainLayout
      title="Employee Details"
      actions={
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">1</span>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search employee..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#6366F1]" />
                  <span className="text-sm font-medium">Department</span>
                </div>

                <Select
                  value={departmentFilter}
                  onValueChange={setDepartmentFilter}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Representative">
                      Representative
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                <Link href="/employee/add">
                  <Button className="bg-[#6366F1] hover:bg-[#5B5CF6] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Employee
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employee Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4">
                      <Checkbox
                        checked={
                          selectedEmployees.length === filteredEmployees.length
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Employee Name
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Department
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Hire Date
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Status
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <Checkbox
                          checked={selectedEmployees.includes(employee.id)}
                          onCheckedChange={() =>
                            handleSelectEmployee(employee.id)
                          }
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={
                                employee.avatar ||
                                `/placeholder.svg?height=40&width=40`
                              }
                            />
                            <AvatarFallback>
                              {employee.firstName.charAt(0)}
                              {employee.lastName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900">
                              {employee.firstName} {employee.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {employee.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-gray-900">
                          {employee.department}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-gray-900">
                          {employee.hireDate}
                        </span>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={
                            employee.employmentStatus === "Active"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            employee.employmentStatus === "Active"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-gray-100 text-gray-800 border-gray-200"
                          }
                        >
                          {employee.employmentStatus}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Link href={`/employee/${employee.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-[#6366F1] border-[#6366F1] bg-transparent"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 p-4 border-t">
              <Button variant="ghost" size="sm">
                Prev
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                1
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                2
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                3
              </Button>
              <Button variant="ghost" size="sm">
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
