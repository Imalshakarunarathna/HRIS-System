"use client";

import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/main-layout";
import DashboardContent from "@/components/dashboard/dashboard-content";

export default function DashboardPage() {
  return (
    <MainLayout
      title="Key Dashboard"
      actions={
        <Button className="bg-[#6366F1] hover:bg-[#5B5CF6] text-white">
          Quick Action
        </Button>
      }
    >
      <DashboardContent />
    </MainLayout>
  );
}
