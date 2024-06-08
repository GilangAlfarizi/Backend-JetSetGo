/*
  Warnings:

  - You are about to drop the column `order_id` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `bags` on the `passengers` table. All the data in the column will be lost.
  - You are about to drop the column `orders_id` on the `passengers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `flights` DROP FOREIGN KEY `flights_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `passengers` DROP FOREIGN KEY `passengers_orders_id_fkey`;

-- AlterTable
ALTER TABLE `flights` DROP COLUMN `order_id`;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `user_id`,
    ADD COLUMN `profile_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `passengers` DROP COLUMN `bags`,
    DROP COLUMN `orders_id`,
    ADD COLUMN `baggage` INTEGER NULL;

-- CreateTable
CREATE TABLE `tickets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `passenger_id` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,

    UNIQUE INDEX `tickets_passenger_id_key`(`passenger_id`),
    UNIQUE INDEX `tickets_order_id_key`(`order_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_passenger_id_fkey` FOREIGN KEY (`passenger_id`) REFERENCES `passengers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_flight_id_fkey` FOREIGN KEY (`flight_id`) REFERENCES `flights`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
