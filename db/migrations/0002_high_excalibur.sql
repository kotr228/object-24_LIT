CREATE TABLE `registrations` (
	`id` text PRIMARY KEY NOT NULL,
	`child_first_name` text NOT NULL,
	`child_last_name` text NOT NULL,
	`child_middle_name` text,
	`child_birth_date` text NOT NULL,
	`current_school` text NOT NULL,
	`target_grade` integer NOT NULL,
	`preferred_profile` text NOT NULL,
	`home_address` text NOT NULL,
	`contact_phone` text NOT NULL,
	`parent_names` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`notes` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
