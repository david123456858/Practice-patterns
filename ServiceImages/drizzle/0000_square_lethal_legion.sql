CREATE TABLE "Images" (
	"idImages" varchar PRIMARY KEY NOT NULL,
	"idVehicle" varchar,
	"fileName" varchar,
	"filePath" varchar,
	"fileSize" integer,
	"width" integer,
	"height" integer,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
