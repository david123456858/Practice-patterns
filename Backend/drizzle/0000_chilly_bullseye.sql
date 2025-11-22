CREATE TABLE "loans" (
	"loan_id" varchar(50) PRIMARY KEY NOT NULL,
	"user_id" varchar(50) NOT NULL,
	"vehicle_id" varchar(50) NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"start_station_id" varchar(50) NOT NULL,
	"end_station_id" varchar(50),
	"status" varchar NOT NULL,
	"cost" numeric(10, 2) DEFAULT '0' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"payment_id" varchar(50) PRIMARY KEY NOT NULL,
	"loan_id" varchar(100) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"status" varchar NOT NULL,
	"payment_method" varchar NOT NULL,
	"payment_date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id_role" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"permissions" text[] NOT NULL,
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "stations" (
	"id_station" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"address" varchar(255) NOT NULL,
	"latitude" numeric(10, 8) NOT NULL,
	"longitude" numeric(11, 8) NOT NULL,
	"location_timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscription_plans" (
	"id_plan" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"monthly_fee" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id_user" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"rol" varchar DEFAULT 'admin' NOT NULL,
	"password" varchar(255) NOT NULL,
	"subscription_id" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_rol_unique" UNIQUE("rol")
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id_vehicle" varchar(50) PRIMARY KEY NOT NULL,
	"color" varchar(50) NOT NULL,
	"model" varchar(100) NOT NULL,
	"station_id" varchar(50) NOT NULL,
	"state" varchar DEFAULT 'AVAILABLE' NOT NULL,
	"type" varchar NOT NULL,
	"latitude" numeric(10, 8) NOT NULL,
	"longitude" numeric(11, 8) NOT NULL,
	"location_timestamp" timestamp DEFAULT now() NOT NULL,
	"max_user_weight" numeric(5, 2) NOT NULL,
	"velocity_max" numeric(5, 2) NOT NULL,
	"cost_for_minute" numeric(10, 2) NOT NULL,
	"info" text
);
--> statement-breakpoint
ALTER TABLE "loans" ADD CONSTRAINT "loans_user_id_users_id_user_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id_user") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "loans" ADD CONSTRAINT "loans_vehicle_id_vehicles_id_vehicle_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id_vehicle") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "loans" ADD CONSTRAINT "loans_start_station_id_stations_id_station_fk" FOREIGN KEY ("start_station_id") REFERENCES "public"."stations"("id_station") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "loans" ADD CONSTRAINT "loans_end_station_id_stations_id_station_fk" FOREIGN KEY ("end_station_id") REFERENCES "public"."stations"("id_station") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_loan_id_loans_loan_id_fk" FOREIGN KEY ("loan_id") REFERENCES "public"."loans"("loan_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_rol_roles_id_role_fk" FOREIGN KEY ("rol") REFERENCES "public"."roles"("id_role") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_subscription_id_subscription_plans_id_plan_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscription_plans"("id_plan") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_station_id_stations_id_station_fk" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("id_station") ON DELETE no action ON UPDATE no action;

-- Seed: Crear rol admin y usuario admin
-- Este script crea el rol de administrador y un usuario admin por defecto

-- 1. Insertar rol admin (si no existe)
INSERT INTO "roles" ("id_role", "name", "permissions")
VALUES (
  '1',
  'admin',
  ARRAY['create_user', 'delete_user', 'update_user', 'view_user']
)
ON CONFLICT ("id_role") DO NOTHING;

INSERT INTO "roles" ("id_role", "name", "permissions")
VALUES (
  '2',
  'client',
  ARRAY['view_profile', 'edit_profile']
)
ON CONFLICT ("id_role") DO NOTHING;

INSERT INTO "users" (
  "id_user",
  "name",
  "last_name",
  "email",
  "rol",
  "password",
  "subscription_id",
  "created_at"
)
VALUES (
  'admin-001',
  'Admin',
  'System',
  'admin@gmail.com',
  '1',
  'admin',
  NULL,
  NOW()	
)
ON CONFLICT ("email") DO NOTHING;

-- Verificar inserción
SELECT 
  u."id_user",
  u."name",
  u."last_name",
  u."email",
  r."name" as "role_name",
  r."permissions"
FROM "users" u
JOIN "roles" r ON u."rol" = r."id_role"
WHERE u."email" = 'admin@gmail.com';