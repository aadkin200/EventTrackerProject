-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ridedb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ridedb` ;

-- -----------------------------------------------------
-- Schema ridedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ridedb` DEFAULT CHARACTER SET utf8 ;
USE `ridedb` ;

-- -----------------------------------------------------
-- Table `ride`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ride` ;

CREATE TABLE IF NOT EXISTS `ride` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `trail_name` VARCHAR(500) NOT NULL,
  `trail_length` VARCHAR(45) NULL,
  `bike` VARCHAR(200) NULL,
  `difficulty` VARCHAR(45) NULL,
  `trail_type` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS rider@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'rider'@'localhost' IDENTIFIED BY 'rider';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'rider'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `ride`
-- -----------------------------------------------------
START TRANSACTION;
USE `ridedb`;
INSERT INTO `ride` (`id`, `trail_name`, `trail_length`, `bike`, `difficulty`, `trail_type`) VALUES (1, 'Meadow Wood', '4 miles', 'YT Jeffsy', 'Black Diamond', 'Trail');
INSERT INTO `ride` (`id`, `trail_name`, `trail_length`, `bike`, `difficulty`, `trail_type`) VALUES (2, 'Bryce', '1 mile', 'YT Cappra', 'Black Diamond', 'Park');

COMMIT;

