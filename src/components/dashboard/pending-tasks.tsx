"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "../../hooks/use-auth";

interface PendingTask {
  id: number;
  type: "leave_request" | "document_access" | "performance_review";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  dueDate?: string;
}

interface LeaveRequest {
  id: number;
  leaveType: string;
  reason: string;
  days: number;
  status: string;
}

export const PendingTasks = () => {
  const { user } = useAuth();
  const [pendingLeaveRequests, setPendingLeaveRequests] = useState<
    LeaveRequest[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mockLeaveRequests: LeaveRequest[] = [
      {
        id: 1,
        leaveType: "Annual Leave",
        reason: "Family vacation",
        days: 5,
        status: "pending",
      },
      {
        id: 2,
        leaveType: "Sick Leave",
        reason: "Medical appointment",
        days: 1,
        status: "pending",
      },
    ];

    // Simulate loading
    setTimeout(() => {
      if (
        user?.roles.some((role) =>
          ["admin", "hr_manager", "department_head"].includes(role)
        )
      ) {
        setPendingLeaveRequests(mockLeaveRequests);
      }
      setIsLoading(false);
    }, 800);
  }, [user]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  const handleApprove = async (requestId: number) => {
    // TODO: Implement approval logic
    console.log("Approve request:", requestId);
  };

  const handleReject = async (requestId: number) => {
    // TODO: Implement rejection logic
    console.log("Reject request:", requestId);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pending Tasks & Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-2 h-2 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const pendingCount = pendingLeaveRequests.length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Pending Tasks & Approvals</CardTitle>
          {pendingCount > 0 && (
            <Badge
              variant="destructive"
              className="bg-red-100 text-red-800 border-red-200"
            >
              {pendingCount} Pending
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {pendingCount === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-sm font-medium text-foreground mb-2">
              All caught up!
            </h3>
            <p className="text-sm text-muted-foreground">
              No pending tasks or approvals at the moment
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingLeaveRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {request.leaveType} Request
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {request.reason || "No reason provided"} - {request.days}{" "}
                      days
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleApprove(request.id)}
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleReject(request.id)}
                  >
                    <XCircle className="h-3 w-3 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
