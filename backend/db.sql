DROP DATABASE IF EXISTS ingatlanok;

CREATE DATABASE ingatlanok;

CREATE TABLE `ingatlanok`.`kategoriak` 
(`id` INT NOT NULL AUTO_INCREMENT , `nev` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`), UNIQUE (`nev`));

CREATE TABLE `ingatlanok`.`ingatlanok`
(`id` INT NOT NULL AUTO_INCREMENT, `kategoria` INT NOT NULL, `leiras` VARCHAR(255) NULL, `hirdetesDatuma` DATETIME NULL DEFAULT CURRENT_TIMESTAMP, `tehermentes` BOOLEAN NOT NULL, `ar` INT NOT NULL, `kepUrl` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`kategoria`) REFERENCES `kategoriak`(`id`));

INSERT INTO `ingatlanok`.`kategoriak`(nev) VALUES ("Ház"), ("Lakás"), ("Építési telek"), ("Garázs"), ("Mezőgazdasági terület"), ("Ipari ingatlan");
