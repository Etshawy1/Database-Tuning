CREATE DATABASE Optimized_University;
USE Optimized_University;
CREATE TABLE Department
(
  ID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(255) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE Professor
(
  ID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(255) NOT NULL,
  Gender ENUM('male', 'female') NOT NULL,
  Salary INT NOT NULL,
  Date_of_Birth DATE NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (department_id) REFERENCES Department(ID)
);

CREATE TABLE Research_Project
(
  ID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(255) NOT NULL,
  Field VARCHAR(255) NOT NULL,
  Duration_in_Months INT NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE Professor_Research
(
  ID INT NOT NULL AUTO_INCREMENT,
  research_project_id INT NOT NULL,
  professor_id INT NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (research_project_id) REFERENCES Research_Project(ID),
  FOREIGN KEY (professor_id) REFERENCES Professor(ID)
);

CREATE TABLE Course
(
  ID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(255) NOT NULL,
  Code VARCHAR(255) NOT NULL,
  department_id INT NOT NULL,
  professor_id INT NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (department_id) REFERENCES Department(ID),
  FOREIGN KEY (professor_id) REFERENCES Professor(ID),
  UNIQUE (Code)
);

CREATE TABLE Student
(
  ID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(255) NOT NULL,
  Phone_Number VARCHAR(255) NOT NULL,
  Gender ENUM('male', 'female') NOT NULL,
  Date_of_Birth DATE NOT NULL,
  Street VARCHAR(255) NOT NULL,
  City VARCHAR(255) NOT NULL,
  Town VARCHAR(255) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (department_id) REFERENCES Department(ID)
);

CREATE TABLE Student_Course
(
  ID INT NOT NULL AUTO_INCREMENT,
  Final_Exam_PDF VARCHAR(255) NOT NULL,
  Final_Exam_Grade ENUM('A', 'B', 'C', 'D', 'E', 'F') NOT NULL,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (student_id) REFERENCES Student(ID),
  FOREIGN KEY (course_id) REFERENCES Course(ID)
);