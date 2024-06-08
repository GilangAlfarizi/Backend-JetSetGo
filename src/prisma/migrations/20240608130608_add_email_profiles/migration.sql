-- AlterTable
ALTER TABLE `profiles` ADD COLUMN `email` VARCHAR(191) NULL,
    MODIFY `first_name` VARCHAR(191) NULL,
    MODIFY `last_name` VARCHAR(191) NULL,
    MODIFY `nationality` VARCHAR(191) NULL,
    MODIFY `gender` ENUM('Male', 'Female') NULL;
