CREATE DATABASE IF NOT EXISTS todolist;
USE todolist;

CREATE TABLE IF NOT EXISTS Categories (
	cate_id int(8) NOT NULL primary key auto_increment,
	name varchar(255) NOT NULL,
  description varchar(255) NOT NULL DEFAULT 'you have to finish it'
);

INSERT INTO Categories (name) values ('job');
INSERT INTO Categories (name) values ('two');
INSERT INTO Categories (name) values ('xjtu');

CREATE TABLE IF NOT EXISTS Todos (
	todo_id int(8) NOT NULL primary key auto_increment,
	title varchar(255) NOT NULL,
	cate_id int NOT NULL,
  is_finished boolean NOT NULL DEFAULT FALSE,
	FOREIGN KEY (cate_id) REFERENCES Categories(cate_id)
);

INSERT INTO Todos (title, cate_id) values ('finish todo list', 1);
INSERT INTO Todos (title, cate_id) values ('do homework', 1);
INSERT INTO Todos (title, cate_id) values ('watch tvvvv', 1);
INSERT INTO Todos (title, cate_id) values ('thoughtworks', 2);
INSERT INTO Todos (title, cate_id) values ('do what you want', 2);
INSERT INTO Todos (title, cate_id) values ('curd curd', 3);
INSERT INTO Todos (title, cate_id) values ('how to create a OS from zero', 3);
INSERT INTO Todos (title, cate_id) values ('gogogogogo', 2);
INSERT INTO Todos (title, cate_id) values ('ffffffffffuuu', 3);

