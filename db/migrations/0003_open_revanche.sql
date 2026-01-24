CREATE TABLE `about_media` (
	`id` text PRIMARY KEY NOT NULL,
	`media_type` text NOT NULL,
	`url` text NOT NULL,
	`caption` text,
	`order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `about_sections` (
	`id` text PRIMARY KEY NOT NULL,
	`section_type` text NOT NULL,
	`title` text NOT NULL,
	`content` text,
	`order` integer DEFAULT 0 NOT NULL,
	`is_published` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `profile_media` (
	`id` text PRIMARY KEY NOT NULL,
	`profile_id` text NOT NULL,
	`media_type` text NOT NULL,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`description` text,
	`order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
