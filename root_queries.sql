CREATE USER 'poker_user'@'%' IDENTIFIED BY 'my_cool_password';
CREATE USER 'poker_user'@'localhost' IDENTIFIED BY 'my_cool_password';
CREATE DATABASE pokerdb;
USE pokerdb;

GRANT ALL PRIVILEGES ON pokerdb.* TO 'poker_user'@'%' IDENTIFIED BY 'my_cool_password';
GRANT ALL PRIVILEGES ON pokerdb.* TO 'poker_user'@'localhost' IDENTIFIED BY 'my_cool_password';