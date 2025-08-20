"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard,
  Users,
  Building2,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  UserCheck,
  Briefcase,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Employee",
    href: "/employee",
    icon: Users,
  },
  {
    name: "HR Operations",
    href: "/hr-operations",
    icon: UserCheck,
  },
  {
    name: "Finance",
    href: "/finance",
    icon: Briefcase,
  },
  {
    name: "Departments",
    href: "/departments",
    icon: Building2,
  },
  {
    name: "Leave Requests",
    href: "/leave-requests",
    icon: Calendar,
  },
  {
    name: "Apply Leave",
    href: "/leave-requests/apply",
    icon: Calendar,
  },
  {
    name: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    name: "Administration",
    href: "/administration",
    icon: Settings,
  },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="flex h-full w-64 flex-col bg-[#3B4CB8] text-white">
      {/* Header */}
      <div className="flex items-center gap-2 p-6 border-b border-white/10">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <Users className="w-5 h-5 text-[#3B4CB8]" />
        </div>
        <span className="text-lg font-semibold">HRIS</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-white/80 hover:text-white hover:bg-white/10",
                  isActive && "bg-white/20 text-white"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-white/20 text-white">
              {user?.firstName?.charAt(0).toUpperCase() || "A"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.roles || "Admin"}
            </p>
            <p className="text-xs text-white/60 truncate">Administrator</p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start gap-3 text-white/80 hover:text-white hover:bg-white/10"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
