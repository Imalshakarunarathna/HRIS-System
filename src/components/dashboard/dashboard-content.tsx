"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  Calendar,
  DollarSign,
  Briefcase,
  Download,
  Plus,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { MetricsCard } from "./metrics-card";
import { RecentActivities } from "./recent-activities";
import { PendingTasks } from "./pending-tasks";
import { DepartmentOverview } from "./depatment-overview";
import { QuickActions } from "./quick-actions";

interface DashboardMetrics {
  totalEmployees: number;
  activeLeaveRequests: number;
  pendingApprovals: number;
  departmentCount: number;
}

export default function DashboardContent() {
  const { user, logout } = useAuth();
  const [isLoading] = useState(false);

  // Mock data - in real app, this would come from API
  const metrics: DashboardMetrics = {
    totalEmployees: 1247,
    activeLeaveRequests: 23,
    pendingApprovals: 8,
    departmentCount: 12,
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>
          <div className="flex space-x-3">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.firstName}. Here&apos;s what&apos;s happening
            at your company today.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="text-muted-foreground border-border hover:bg-muted bg-transparent"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="mr-2 h-4 w-4" />
            Quick Action
          </Button>
          <Button
            variant="outline"
            onClick={logout}
            className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Employees"
          value={metrics.totalEmployees.toLocaleString()}
          icon={Users}
          trend={{
            value: 5.2,
            label: "+5.2% from last month",
            type: "up",
          }}
        />
        <MetricsCard
          title="Active Leave Requests"
          value={metrics.activeLeaveRequests}
          icon={Calendar}
          trend={{
            value: 0,
            label: "Requires attention",
            type: "neutral",
          }}
        />
        <MetricsCard
          title="Payroll This Month"
          value="$2.4M"
          icon={DollarSign}
          trend={{
            value: 0,
            label: "Processed successfully",
            type: "up",
          }}
        />
        <MetricsCard
          title="Open Positions"
          value="18"
          icon={Briefcase}
          trend={{
            value: 0,
            label: "Actively recruiting",
            type: "neutral",
          }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Activities and Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <RecentActivities />
          <PendingTasks />
        </div>

        {/* Right Column - Quick Info */}
        <div className="space-y-6">
          <DepartmentOverview />
          <QuickActions />

          {/* System Status */}
          <div className="bg-card rounded-xl shadow-sm border border-border">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-medium text-foreground">
                System Status
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Database Connection
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Healthy</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Backup Status
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Up to date</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Security Scan
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-yellow-600">Scheduled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
