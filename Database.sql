CREATE TABLE `Project1`.`employees` (
  `employee_id` INT NOT NULL AUTO_INCREMENT,
  `employee_firstname` VARCHAR(45) NOT NULL,
  `employee_lastname` VARCHAR(45) NULL,
  `office_id` INT NULL,
  `employee_address` VARCHAR(45) NULL,
  `employee_ssn` VARCHAR(45) NULL,
  `employee_manager_id` VARCHAR(45) NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE INDEX `employee_id_UNIQUE` (`employee_id` ASC) VISIBLE,
  INDEX `office_id_idx` (`office_id` ASC) VISIBLE,
  CONSTRAINT `office_id`
    FOREIGN KEY (`office_id`)
    REFERENCES `Project1`.`office` (`office_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


Select * from employee;

USE Project1;

INSERT INTO office()
	VALUES(1, 'Lake Mary', '456 Lake Rd', 100);

INSERT INTO employee()
	VALUES(1, 'Jared', 'Mai', 1, '123 Lane', '123-45-6789', '0');
    
ALTER TABLE `Project1`.`employee` 
CHANGE COLUMN `employee_id` `employee_id` INT NOT NULL AUTO_INCREMENT ;


