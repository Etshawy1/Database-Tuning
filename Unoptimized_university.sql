CREATE DATABASE University;
USE University;
CREATE TABLE Department
(
  ID INT NOT NULL,
  Name INT NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE Professor
(
  Name INT NOT NULL,
  Gender INT NOT NULL,
  ID INT NOT NULL,
  Salary INT NOT NULL,
  Date_of_Birth INT NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (department_id) REFERENCES Department(ID)
);

CREATE TABLE Research_Project
(
  ID INT NOT NULL,
  Name INT NOT NULL,
  Field INT NOT NULL,
  Duration_in_Months INT NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE Grade
(
  ID INT NOT NULL,
  Name INT NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE Works_on
(
  ID INT NOT NULL,
  research_project_id INT NOT NULL,
  professor_id INT NOT NULL,
  PRIMARY KEY (ID, ID),
  FOREIGN KEY (research_project_id) REFERENCES Research_Project(ID),
  FOREIGN KEY (professor_id) REFERENCES Professor(ID)
);

CREATE TABLE Course
(
  Name INT NOT NULL,
  Code INT NOT NULL,
  ID INT NOT NULL,
  department_id INT NOT NULL,
  professor_id INT NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (department_id) REFERENCES Department(ID),
  FOREIGN KEY (professor_id) REFERENCES Professor(ID),
  UNIQUE (Code)
);

CREATE TABLE Student
(
  Name INT NOT NULL,
  Phone_Number INT NOT NULL,
  Gender INT NOT NULL,
  ID INT NOT NULL,
  Date_of_Birth INT NOT NULL,
  Street INT NOT NULL,
  City INT NOT NULL,
  Town INT NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (department_id) REFERENCES Department(ID)
);

CREATE TABLE Final_Exam
(
  ID INT NOT NULL,
  grade_id INT,
  course_id INT NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (grade_id) REFERENCES Grade(ID),
  FOREIGN KEY (course_id) REFERENCES Course(ID)
);

CREATE TABLE Student_Final_Exam
(
  ID INT NOT NULL,
  PDF_photo_copy INT NOT NULL,
  student_id INT NOT NULL,
  final_exam_id INT NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (student_id) REFERENCES Student(ID),
  FOREIGN KEY (final_exam_id) REFERENCES Final_Exam(ID)
);

CREATE TABLE Student_Course
(
  ID INT NOT NULL,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (student_id) REFERENCES Student(ID),
  FOREIGN KEY (course_id) REFERENCES Course(ID)
);