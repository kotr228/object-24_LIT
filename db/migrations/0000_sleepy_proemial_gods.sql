CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role` text DEFAULT 'admin' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `teachers` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`middle_name` text,
	`position` text NOT NULL,
	`specialization` text NOT NULL,
	`photo` text,
	`bio` text,
	`email` text,
	`phone` text,
	`order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`full_description` text,
	`icon` text,
	`color` text,
	`subjects` text,
	`achievements` text,
	`order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_slug_unique` ON `profiles` (`slug`);--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`graduation_year` integer NOT NULL,
	`photo` text,
	`content` text NOT NULL,
	`achievement` text,
	`university` text,
	`order` integer DEFAULT 0 NOT NULL,
	`is_published` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `news` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`cover_image` text,
	`category` text DEFAULT 'general' NOT NULL,
	`is_published` integer DEFAULT true NOT NULL,
	`published_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `news_slug_unique` ON `news` (`slug`);--> statement-breakpoint
CREATE TABLE `settings` (
	`id` text PRIMARY KEY DEFAULT 'main' NOT NULL,
	`school_name` text DEFAULT 'Олександрійський ліцей інформаційних технологій' NOT NULL,
	`school_description` text DEFAULT 'Сучасна освіта, професійні вчителі, індивідуальний підхід до кожного учня.' NOT NULL,
	`address` text DEFAULT 'м. Олександрія, Кіровоградська область' NOT NULL,
	`phone` text DEFAULT '+38 (012) 345-67-89' NOT NULL,
	`email` text DEFAULT 'info@lit.kr.ua' NOT NULL,
	`updated_at` text
);
