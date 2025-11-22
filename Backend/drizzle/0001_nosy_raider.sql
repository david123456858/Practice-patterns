ALTER TABLE "roles" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "subscription_plans" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "roles" CASCADE;--> statement-breakpoint
DROP TABLE "subscription_plans" CASCADE;--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_rol_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_rol_roles_id_role_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_subscription_id_subscription_plans_id_plan_fk";
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "rol" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "subscription_id";