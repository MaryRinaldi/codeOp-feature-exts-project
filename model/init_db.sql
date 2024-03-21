SET foreign_key_checks = 0;
DROP TABLE if exists users;
DROP TABLE if exists families;
DROP TABLE if exists children;
DROP TABLE if exists invitations;
DROP TABLE if exists schools;
DROP TABLE if exists teachers;
DROP TABLE if exists family_doctors;
DROP TABLE if exists clinics;
DROP TABLE if exists family_20022_members;
DROP TABLE if exists family_20023_members;
DROP TABLE if exists family_20024_members;
DROP TABLE if exists family_20025_members;
DROP TABLE if exists family_20026_members;
DROP TABLE if exists family_20027_members;
DROP TABLE if exists family_20028_members;
SET foreign_key_checks = 1;

CREATE TABLE `users`(
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(30) NOT NULL,
    `lastName` VARCHAR(30) NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(30) NOT NULL,
    `dob` CHAR(10) NOT NULL,
    `sex` ENUM('0', '1') NOT NULL DEFAULT '0',
    `gender` ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    `pronouns` ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    `photoSource` VARCHAR(30) NULL,
    `adminFamily` MEDIUMINT DEFAULT NULL,
    `family` MEDIUMINT DEFAULT NULL
)ENGINE=INNODB AUTO_INCREMENT = 10011;

INSERT INTO users(firstName, lastName, email, password, phoneNumber, dob, sex, gender, pronouns, photoSource, adminFamily, family)
VALUES
    ('Sofie', 'Stephens', 'sofie@email.com', 'qwerty', '123456789',  '1988-01-20', '1', '1', '1', 'stephens-sofie', 20022, 20022),
    ('Claus', 'Weismann', 'claus@email.com', 'qwerty', '123456789', '1987-02-12', '0', '0', '0', 'weismann-claus', 20023, 20023),
    ('Gale', 'Vasquez', 'gale@email.com', 'qwerty', '123456789', '1990-01-23', '1', '2', '2', 'vasquez-gale', null, null),
    ('Milan', 'Zukal', 'milan@email.com', 'qwerty', '123456789', '1988-04-29', '0', '0', '0', 'zukal-milan', null, 20022),
    ('Sebastian', 'Kruse', 'seb@email.com', 'qwerty', '123456789', '1988-07-23', '0', '2', '2', 'kruse-seb', null, null),
    ('Tiiu', 'Tamm', 'tiiu@email.com', 'qwerty', '123456789', '1987-10-25', '1', '1', '1', 'tamm-tiiu', null, null),
    ('Sara', 'Fitzpatrick', 'sara@email.com', 'qwerty', '123456789', '2000-04-23', '1', '1', '1', 'fitz-sara', null, null),
    ('Julia', 'Stone', 'julia@email.com', 'qwerty', '123456789', '1998-06-09', '1', '1', '1', 'stone-julia', null, null),
    ('Ava', 'Pohl', 'ava@email.com', 'qwerty', '123456789', '1992-04-23', '1', '1', '1', 'pohl-ava', null, null),
    ('Jack', 'Michaels', 'jack@email.com', 'qwerty', '123456789', '1939-04-23', '0', '0', '0', 'michaels-jack', null, 20022);


CREATE TABLE `families`(
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `familyName` VARCHAR(40) NOT NULL,
    `adminUser` MEDIUMINT NOT NULL
)ENGINE=INNODB AUTO_INCREMENT = 20022;

INSERT INTO families(familyName, adminUser)
VALUES
    ('Stephens', 10011),
    ('Weismann', 10012);

CREATE TABLE `children`(
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(40) NOT NULL,
    `sex` ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    `gender` ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    `pronouns` ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    `dob` CHAR(10) NOT NULL,
    `primaryFamily` MEDIUMINT NOT NULL,
    `familyAdminGuardian` MEDIUMINT NOT NULL,
    `importantInfo` VARCHAR(40)
)ENGINE=INNODB AUTO_INCREMENT = 30033;

INSERT INTO children(firstName, sex, gender, dob, primaryFamily, familyAdminGuardian, pronouns, importantInfo)
VALUES
    ('Julie', '1', '1', '2016-11-06', 20022, 10011, '1', 'Cannot eat peanuts'),
    ('Peter', '2', '0', '2015-09-15', 20022, 10011, '0', 'Ask for his day'),
    ('Michael', '2', '0', '2014-09-21', 20023, 10012, '0', 'Dust allergy'),
    ('Lucy', '1', '1', '2016-01-11', 20023, 10012, '1', 'Ask for consent'),
    ('Robin', '1', '2', '2013-05-01', 20023, 10012, '2', 'None');

CREATE TABLE `family_20022_members`(
    `grp` ENUM('adult', 'child') NOT NULL,
    `userId` MEDIUMINT NOT NULL,
    `isAdminUser` TINYINT(1) NOT NULL DEFAULT '0',
    `isPrimaryGuardian` TINYINT(1) NOT NULL DEFAULT '0',
    `isExtendedFamilyGuardian` TINYINT(1) NOT NULL DEFAULT '0',
    `isThirdPartyGuardian` TINYINT(1) NOT NULL DEFAULT '0',
    PRIMARY KEY (grp,userId)
)ENGINE=MyISAM;

INSERT INTO family_20022_members(grp, userId, isAdminUser, isPrimaryGuardian, isExtendedFamilyGuardian, isThirdPartyGuardian)
VALUES
    ('adult', 10011, '1', '1', '0', '0'),
    ('adult', 10014, '0', '1', '0', '0'),
    ('child', 30033, '0', '0', '0', '0'),
    ('child', 30034, '0', '0', '0', '0'),
    ('adult', 10020, '0', '0', '1', '0');

CREATE TABLE `family_20023_members`(
    `grp` ENUM('adult', 'child') NOT NULL,
    `userId` MEDIUMINT NOT NULL,
    `isAdminUser` TINYINT(1) NOT NULL DEFAULT '0',
    `isPrimaryGuardian` TINYINT(1) NOT NULL DEFAULT '0',
    `isExtendedFamilyGuardian` TINYINT(1) NOT NULL DEFAULT '0',
    `isThirdPartyGuardian` TINYINT(1) NOT NULL DEFAULT '0',
    PRIMARY KEY (grp,userId)
)ENGINE=MyISAM;

INSERT INTO family_20023_members(grp, userId, isAdminUser, isPrimaryGuardian)
VALUES
    ('adult', 10012, '1', '1'),
    ('adult', 10017, '0', '1'),
    ('child', 30035, '0', '0'),
    ('child', 30036, '0', '0'),
    ('child', 30037, '0', '0');

CREATE TABLE `invitations`(
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `invitor` MEDIUMINT NOT NULL,
    `invitorName` VARCHAR(40) NOT NULL,
    `invitorFamily` MEDIUMINT NOT NULL,
    `invitorFamilyName` VARCHAR(40) NOT NULL,
    `invitee` MEDIUMINT NOT NULL,
    `inviteeName` VARCHAR(40) NOT NULL,
    `inviteeRole` ENUM('primary', 'extended', 'third') NOT NULL
)ENGINE=INNODB AUTO_INCREMENT = 40044;

INSERT INTO invitations(invitor, invitorName, invitorFamily, invitorFamilyName, invitee, inviteeName, inviteeRole)
VALUES
    (10011, "Sofie Stephens", 20022, "Stephens", 10013, "Gale Vasquez", "third");


CREATE TABLE `clinics`(
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `clinicName` VARCHAR(40) NOT NULL,
    `clinicEmail` VARCHAR(40) NOT NULL,
    `clinicPhoneNo` VARCHAR(30) NOT NULL,
    `streetAddress` VARCHAR(40) NOT NULL,
    `city` VARCHAR(40) NOT NULL,
    `websiteURL` VARCHAR(40) NULL,
    `familyId` MEDIUMINT NOT NULL
)ENGINE=INNODB AUTO_INCREMENT = 50055;

INSERT INTO clinics(clinicName, clinicEmail, clinicPhoneNo, streetAddress, city, websiteURL, familyId)
VALUES
    ('Ülemiste Perekliinik', 'tere@perekliinik.ee', '6665500', 'Valukoja 7', 'Tallinn', 'https://perekliinik.ee', 20022),
    ('Confido', 'info@confido.ee', '6664422', 'Veerenni 51', 'Tallinn', 'https://www.confido.ee', 20022),
    ('Tallinna Lastehaigla', 'info@lastehaigla.ee', '6774455', 'Tervise 28', 'Tallinn', 'https://www.lastehaigla.ee', 20022);


CREATE TABLE `family_doctors`(
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(40) NOT NULL,
    `lastName` VARCHAR(40) NOT NULL,
    `languages` VARCHAR(40) NOT NULL,
    `doctorType` VARCHAR(40) NOT NULL,
    `clinicId` MEDIUMINT NOT NULL,
    `familyId` MEDIUMINT NOT NULL
)ENGINE=INNODB AUTO_INCREMENT = 60066;

INSERT INTO family_doctors(firstName, lastName, languages, doctorType, clinicId, familyId)
VALUES
    ('Indrek', 'Uibopuu', 'EE,RU,GB', 'Family doctor', 50055, 20022),
    ('Helen', 'Ilves', 'EE,GB,DE', 'Psychologist', 50056, 20022),
    ('Ingrid', 'Kapp', 'EE,GB,SE,FI', 'Family doctor', 50056, 20022),
    ('Kristjan', 'Kukk', 'EE,GB', 'Paediatrician', 50057, 20022);

CREATE TABLE `schools`(
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `schoolName` VARCHAR(40) NOT NULL,
    `schoolEmail` VARCHAR(40) NOT NULL,
    `schoolPhoneNo` VARCHAR(30) NOT NULL,
    `streetAddress` VARCHAR(40) NOT NULL,
    `city` VARCHAR(40) NOT NULL,
    `websiteURL` VARCHAR(40) NULL,
    `familyId` MEDIUMINT NOT NULL
)ENGINE=INNODB AUTO_INCREMENT = 70077;

INSERT INTO schools(schoolName, schoolEmail, schoolPhoneNo, streetAddress, city, websiteURL, familyId)
VALUES
    ('Tallinna Inglise Kolledž', 'tik@tik.edu.ee', '6461306', 'Estonia pst 10', 'Tallinn', 'https://tik.edu.ee/', 20022),
    ('Tallinna Reaalkool', 'real@real.edu.ee', '6992026', 'Estonia pst 6', 'Tallinn', 'https://real.edu.ee/', 20022);

CREATE TABLE `teachers`(
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(40) NOT NULL,
    `lastName` VARCHAR(40) NOT NULL,
    `mobileNo` VARCHAR(30) NOT NULL,
    `email` VARCHAR(40) NOT NULL,
    `schoolId` MEDIUMINT NOT NULL,
    `familyId` MEDIUMINT NOT NULL
)ENGINE=INNODB AUTO_INCREMENT = 80088;

INSERT INTO teachers(firstName, lastName, mobileNo, email, schoolId, familyId)
VALUES
    ('Virve', 'Luik', '53300066', 'luik.v@tik.edu.ee', 70077, 20022),
    ('Piret', 'Lumi', '53500088', 'lumi.p@tik.edu.ee', 70077, 20022),
    ('Andres', 'Kirsipuu', '53500088', 'kirsipuu.a@real.edu.ee', 70078, 20022);


ALTER TABLE
    `families` ADD CONSTRAINT `families_adminuser_foreign` FOREIGN KEY(`adminUser`) REFERENCES `users`(`id`);
ALTER TABLE
    `users` ADD CONSTRAINT `users_adminfamily_foreign` FOREIGN KEY(`adminFamily`) REFERENCES `families`(`id`);
ALTER TABLE
    `children` ADD CONSTRAINT `children_familyadminguardian_foreign` FOREIGN KEY(`familyAdminGuardian`) REFERENCES `users`(`id`);
ALTER TABLE
    `children` ADD CONSTRAINT `children_primaryfamily_foreign` FOREIGN KEY(`primaryFamily`) REFERENCES `families`(`id`);
ALTER TABLE
    `invitations` ADD CONSTRAINT `invitations_invitor_foreign` FOREIGN KEY(`invitor`) REFERENCES `users`(`id`);
ALTER TABLE
    `invitations` ADD CONSTRAINT `invitations_invitee_foreign` FOREIGN KEY(`invitee`) REFERENCES `users`(`id`);
ALTER TABLE
    `invitations` ADD CONSTRAINT `invitations_invitorfamily_foreign` FOREIGN KEY(`invitorFamily`) REFERENCES `families`(`id`);
ALTER TABLE
    `family_doctors` ADD CONSTRAINT `family_doctors_familyid_foreign` FOREIGN KEY(`familyId`) REFERENCES `families`(`id`);
ALTER TABLE
    `family_doctors` ADD CONSTRAINT `family_doctors_clinicid_foreign` FOREIGN KEY(`clinicId`) REFERENCES `clinics`(`id`);
ALTER TABLE
    `teachers` ADD CONSTRAINT `teachers_familyid_foreign` FOREIGN KEY(`familyId`) REFERENCES `families`(`id`);
ALTER TABLE
    `teachers` ADD CONSTRAINT `teachers_schoolid_foreign` FOREIGN KEY(`schoolId`) REFERENCES `schools`(`id`);
ALTER TABLE
    `schools` ADD CONSTRAINT `schools_familyid_foreign` FOREIGN KEY(`familyId`) REFERENCES `families`(`id`);