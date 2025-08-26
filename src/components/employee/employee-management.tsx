"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MoreHorizontal,
  Search,
  Users,
  UserCheck,
  UserX,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import type { Employee } from "@/lib/types/employee"; // Updated import path to use local types
import { toast } from "sonner";

interface EmployeeManagementPageProps {
  employees: Employee[];
}

export function EmployeeManagementPage({
  employees: initialEmployees,
}: EmployeeManagementPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState(initialEmployees);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  const filteredEmployees = employees.filter(
    (e) =>
      e.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCount = employees.filter(
    (e) => e.employmentStatus === "Active"
  ).length;
  const inactiveCount = employees.length - activeCount;

  // Delete Employee
  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this employee?");
    if (!confirmed) return;

    setLoadingIds((prev) => [...prev, id]);

    try {
      const res = await fetch("/api/employee/delete", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      const data = await res.json();

      if (data.success) {
        setEmployees((prev) => prev.filter((e) => e.id !== id));
        toast.success("Employee deleted successfully");
      } else {
        toast.error(data.message || "Failed to delete employee");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete employee");
    } finally {
      setLoadingIds((prev) => prev.filter((lid) => lid !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Employee Management</h1>
          <p className="text-muted-foreground">
            Manage your team members and their information
          </p>
        </div>
        <Link href="/employee/add">
          <Button className="bg-[#6366F1] hover:bg-[#5B5CF6] text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-xs text-muted-foreground">Active team members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {activeCount}
            </div>
            <p className="text-xs text-muted-foreground">Currently employed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {inactiveCount}
            </div>
            <p className="text-xs text-muted-foreground">Not active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(employees.map((e) => e.department)).size}
            </div>
            <p className="text-xs text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="bg-card p-4 rounded-lg border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees by name, email, or job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Employees Table */}
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  {searchTerm
                    ? "No employees match your search criteria."
                    : "No employees found. Add your first employee to get started."}
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="font-medium">
                      {employee.firstName} {employee.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ID: {employee.employeeId}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{employee.jobTitle}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{employee.department}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {employee.phoneNumber && (
                        <div className="text-sm">{employee.phoneNumber}</div>
                      )}
                      <div className="text-sm text-muted-foreground">
                        {employee.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        employee.employmentStatus === "Active"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {employee.employmentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/employee/${employee.id}`}>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Employee
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(employee.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {loadingIds.includes(employee.id)
                            ? "Deleting..."
                            : "Delete Employee"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Results Summary */}
      {searchTerm && (
        <div className="text-sm text-muted-foreground text-center">
          Showing {filteredEmployees.length} of {employees.length} employees
        </div>
      )}
    </div>
  );
}
