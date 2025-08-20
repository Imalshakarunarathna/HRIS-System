"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Code, TrendingUp, Palette, Building } from "lucide-react";

interface Department {
  id: number;
  name: string;
  description: string;
  employeeCount: number;
  attendance: number;
}

export const DepartmentOverview = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mockDepartments: Department[] = [
      {
        id: 1,
        name: "Engineering",
        description: "Software development and technical operations",
        employeeCount: 25,
        attendance: 95,
      },
      {
        id: 2,
        name: "Sales & Marketing",
        description: "Revenue generation and brand management",
        employeeCount: 15,
        attendance: 92,
      },
      {
        id: 3,
        name: "Design",
        description: "User experience and visual design",
        employeeCount: 8,
        attendance: 98,
      },
      {
        id: 4,
        name: "Human Resources",
        description: "People operations and talent management",
        employeeCount: 5,
        attendance: 100,
      },
    ];

    // Simulate loading
    setTimeout(() => {
      setDepartments(mockDepartments);
      setIsLoading(false);
    }, 600);
  }, []);

  const getDepartmentIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("engineering") || lowerName.includes("tech")) {
      return <Code className="h-4 w-4 text-primary" />;
    }
    if (lowerName.includes("sales") || lowerName.includes("marketing")) {
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    }
    if (lowerName.includes("design")) {
      return <Palette className="h-4 w-4 text-yellow-600" />;
    }
    return <Building className="h-4 w-4 text-gray-600" />;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Department Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {departments.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-medium text-foreground mb-2">
              No departments found
            </h3>
            <p className="text-sm text-muted-foreground">
              Departments will be displayed here once they are created
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {departments.slice(0, 4).map((dept: Department) => (
              <div key={dept.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    {getDepartmentIcon(dept.name)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {dept.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {dept.description || "No description"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {dept.attendance}%
                  </p>
                  <p className="text-xs text-muted-foreground">Attendance</p>
                </div>
              </div>
            ))}

            {departments.length > 4 && (
              <Button
                variant="ghost"
                className="w-full mt-4 text-primary hover:text-primary/80"
              >
                View All Departments
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
