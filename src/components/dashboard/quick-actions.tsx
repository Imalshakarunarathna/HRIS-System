"use client";

import type React from "react";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, CreditCard, FileText, Shield } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface QuickAction {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
  requiredPermission?: string;
  requiredRole?: string;
}

export const QuickActions = () => {
  const { hasPermission, hasRole } = useAuth();

  const actions: QuickAction[] = [
    {
      label: "Add Employee",
      icon: UserPlus,
      href: "/employee/add",
      color: "bg-primary/5 hover:bg-primary/10 text-primary",
      requiredPermission: "employees.write",
    },
    {
      label: "Process Payroll",
      icon: CreditCard,
      href: "/payroll",
      color: "bg-green-50 hover:bg-green-100 text-green-600",
      requiredRole: "admin",
    },
    {
      label: "Generate Report",
      icon: FileText,
      href: "/reports",
      color: "bg-yellow-50 hover:bg-yellow-100 text-yellow-600",
      requiredRole: "admin",
    },
    {
      label: "Manage Access",
      icon: Shield,
      href: "/administration/users",
      color: "bg-purple-50 hover:bg-purple-100 text-purple-600",
      requiredRole: "admin",
    },
  ];

  const filteredActions = actions.filter((action) => {
    if (
      action.requiredPermission &&
      !hasPermission(action.requiredPermission)
    ) {
      return false;
    }
    if (action.requiredRole && !hasRole(action.requiredRole)) {
      return false;
    }
    return true;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {filteredActions.map((action) => (
            <Link key={action.label} href={action.href}>
              <Button
                variant="ghost"
                className={`p-4 h-auto flex-col text-center transition-colors ${action.color}`}
              >
                <action.icon className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            </Link>
          ))}
        </div>

        {filteredActions.length === 0 && (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-medium text-foreground mb-2">
              No quick actions available
            </h3>
            <p className="text-sm text-muted-foreground">
              Quick actions will appear based on your permissions
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
