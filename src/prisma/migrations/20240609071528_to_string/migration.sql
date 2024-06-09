-- AlterTable
ALTER TABLE `orders` ADD COLUMN `payment_method` VARCHAR(191) NULL,
    MODIFY `payment_number` VARCHAR(191) NULL;
