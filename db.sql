--
-- Скрипт сгенерирован Devart dbForge Studio for MySQL, Версия 6.2.280.0
-- Домашняя страница продукта: http://www.devart.com/ru/dbforge/mysql/studio
-- Дата скрипта: 31.12.2014 0:19:05
-- Версия сервера: 5.5.23
-- Версия клиента: 4.1
--


CREATE DATABASE IF NOT EXISTS fb_finance
CHARACTER SET utf8
COLLATE utf8_general_ci;

USE fb_finance;

CREATE TABLE IF NOT EXISTS currency (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB
AUTO_INCREMENT = 3
AVG_ROW_LENGTH = 8192
CHARACTER SET utf8
COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS months (
  id int(11) NOT NULL AUTO_INCREMENT,
  name_eng varchar(50) NOT NULL,
  name_rus varchar(50) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB
AUTO_INCREMENT = 13
AVG_ROW_LENGTH = 1365
CHARACTER SET utf8
COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS status (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB
AUTO_INCREMENT = 5
AVG_ROW_LENGTH = 4096
CHARACTER SET utf8
COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS users (
  id int(11) NOT NULL AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB
AUTO_INCREMENT = 16
AVG_ROW_LENGTH = 5461
CHARACTER SET utf8
COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS accounts (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  money float NOT NULL DEFAULT 0,
  currency_id int(11) NOT NULL,
  month_id int(11) NOT NULL,
  year year(4) NOT NULL,
  user_id int(11) NOT NULL,
  order_num int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_accounts_currency_id FOREIGN KEY (currency_id)
  REFERENCES currency (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_accounts_months_id FOREIGN KEY (month_id)
  REFERENCES months (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_accounts_users_id FOREIGN KEY (user_id)
  REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE = INNODB
AUTO_INCREMENT = 4
CHARACTER SET utf8
COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS costs (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  cost float NOT NULL DEFAULT 0,
  spend float NOT NULL DEFAULT 0,
  currency_id int(11) NOT NULL,
  month_id int(11) NOT NULL,
  year year(4) NOT NULL,
  status_id int(11) NOT NULL,
  user_id int(11) NOT NULL,
  order_num int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_costs_currency_id FOREIGN KEY (currency_id)
  REFERENCES currency (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_costs_months_id FOREIGN KEY (month_id)
  REFERENCES months (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_costs_status_id FOREIGN KEY (status_id)
  REFERENCES status (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_costs_users_id FOREIGN KEY (user_id)
  REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE = INNODB
AUTO_INCREMENT = 2
CHARACTER SET utf8
COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS debts (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  money int(11) NOT NULL DEFAULT 0,
  currency_id int(11) NOT NULL,
  user_id int(11) NOT NULL,
  order_num int(11) DEFAULT NULL,
  month_id int(11) NOT NULL,
  year year(4) NOT NULL,
  status_id int(11) NOT NULL,
  deadline date NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_debts_currency_id FOREIGN KEY (currency_id)
  REFERENCES currency (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_debts_months_id FOREIGN KEY (month_id)
  REFERENCES months (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_debts_status_id FOREIGN KEY (status_id)
  REFERENCES status (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_debts_users_id FOREIGN KEY (user_id)
  REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE = INNODB
AUTO_INCREMENT = 2
CHARACTER SET utf8
COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS income (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  money int(11) NOT NULL DEFAULT 0,
  currency_id int(11) NOT NULL,
  day int(11) NOT NULL,
  month_id int(11) NOT NULL,
  year year(4) NOT NULL,
  user_id int(11) NOT NULL,
  status_id int(11) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_income_currency_id FOREIGN KEY (currency_id)
  REFERENCES currency (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_income_months_id FOREIGN KEY (month_id)
  REFERENCES months (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_income_status_id FOREIGN KEY (status_id)
  REFERENCES status (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_income_users_id FOREIGN KEY (user_id)
  REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE = INNODB
AUTO_INCREMENT = 2
CHARACTER SET utf8
COLLATE utf8_general_ci;