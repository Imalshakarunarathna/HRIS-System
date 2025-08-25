ALTER TABLE "employees" DROP CONSTRAINT "employees_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "employees" DROP CONSTRAINT "employees_department_id_departments_id_fk";
--> statement-breakpoint
ALTER TABLE "employees" ALTER COLUMN "employee_id" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "employees" ALTER COLUMN "hire_date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "employees" ALTER COLUMN "phone_number" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "first_name" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "last_name" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "email" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "job_title" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "department" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "reporting_manager" varchar(100);--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "employment_status" varchar(20) DEFAULT 'Active' NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "date_of_birth" date;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "gender" varchar(10);--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "employees" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "employees" DROP COLUMN "department_id";--> statement-breakpoint
ALTER TABLE "employees" DROP COLUMN "supervisor_id";--> statement-breakpoint
ALTER TABLE "employees" DROP COLUMN "position";--> statement-breakpoint
ALTER TABLE "employees" DROP COLUMN "salary";--> statement-breakpoint
ALTER TABLE "employees" DROP COLUMN "status";--> statement-breakpoint
ALTER TABLE "employees" DROP COLUMN "work_location";--> statement-breakpoint
ALTER TABLE "employees" DROP COLUMN "emergency_contact";