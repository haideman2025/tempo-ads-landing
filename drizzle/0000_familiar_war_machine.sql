CREATE TABLE `tempo_waitlist_entries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slot_number` int NOT NULL,
	`full_name` varchar(120) NOT NULL,
	`phone` varchar(24) NOT NULL,
	`email` varchar(320),
	`preferred_sku` enum('3ml','5ml') NOT NULL,
	`note` text,
	`marketing_consent` boolean NOT NULL DEFAULT false,
	`consented_at` timestamp NOT NULL,
	`source` varchar(80) NOT NULL DEFAULT 'night-confident-landing',
	`status` enum('waitlisted','contacted','converted','cancelled') NOT NULL DEFAULT 'waitlisted',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tempo_waitlist_entries_id` PRIMARY KEY(`id`),
	CONSTRAINT `tempo_waitlist_phone_unique` UNIQUE(`phone`),
	CONSTRAINT `tempo_waitlist_slot_unique` UNIQUE(`slot_number`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
