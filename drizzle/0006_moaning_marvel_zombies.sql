ALTER TABLE `tempo_cod_orders` ADD `fbp` varchar(255);--> statement-breakpoint
ALTER TABLE `tempo_cod_orders` ADD `fbc` varchar(255);--> statement-breakpoint
ALTER TABLE `tempo_cod_orders` ADD `client_user_agent` varchar(500);--> statement-breakpoint
ALTER TABLE `tempo_cod_orders` ADD `client_ip_address` varchar(64);--> statement-breakpoint
ALTER TABLE `tempo_cod_orders` ADD `purchase_reported_at` timestamp;