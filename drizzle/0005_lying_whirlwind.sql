CREATE TABLE `tempo_cod_orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`order_number` varchar(32) NOT NULL,
	`sku` varchar(64) NOT NULL DEFAULT 'tempo-3ml',
	`full_name` varchar(120) NOT NULL,
	`phone` varchar(24) NOT NULL,
	`address` varchar(500) NOT NULL,
	`quantity` int NOT NULL,
	`unit_price` int NOT NULL DEFAULT 499000,
	`total_value` int NOT NULL,
	`note` text,
	`order_consent` boolean NOT NULL,
	`marketing_consent` boolean NOT NULL DEFAULT false,
	`status` enum('pending_confirmation','confirmed','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending_confirmation',
	`utm_source` varchar(120),
	`utm_medium` varchar(120),
	`utm_campaign` varchar(180),
	`utm_content` varchar(180),
	`utm_term` varchar(180),
	`fbclid` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tempo_cod_orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `tempo_cod_order_number_unique` UNIQUE(`order_number`),
	CONSTRAINT `tempo_cod_order_quantity_range` CHECK(`tempo_cod_orders`.`quantity` between 1 and 2),
	CONSTRAINT `tempo_cod_order_value_positive` CHECK(`tempo_cod_orders`.`unit_price` > 0 and `tempo_cod_orders`.`total_value` = `tempo_cod_orders`.`unit_price` * `tempo_cod_orders`.`quantity`)
);
--> statement-breakpoint
CREATE TABLE `tempo_inventory` (
	`sku` varchar(64) NOT NULL,
	`on_hand` int NOT NULL,
	`reserved` int NOT NULL DEFAULT 0,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tempo_inventory_sku` PRIMARY KEY(`sku`),
	CONSTRAINT `tempo_inventory_nonnegative` CHECK(`tempo_inventory`.`on_hand` >= 0 and `tempo_inventory`.`reserved` >= 0 and `tempo_inventory`.`reserved` <= `tempo_inventory`.`on_hand`)
);
