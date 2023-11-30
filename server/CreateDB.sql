/*
    CreateDB SQL File
    Authored By Ryan Barillos

    Date Started: 29 Nov 2023
    Last Updated: 29 Nov 2023
*/

USE master;
GO

-- Make database START
IF  DB_ID('SODV2201_Group3') IS NOT NULL
    DROP DATABASE SODV2201_Group3;
GO
CREATE DATABASE SODV2201_Group3;
GO
USE SODV2201_Group3;
GO
-- Make database END



-- Make Tables START
CREATE TABLE Courses
(
    courseID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    courseName NVARCHAR(255) NOT NULL UNIQUE,
    courseCode NVARCHAR(7) NOT NULL UNIQUE,
    courseTerm INT NOT NULL
);

CREATE TABLE Students
(
    studentID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    studentTerm INT NOT NULL DEFAULT 1,
    studentEmail NVARCHAR(255) NOT NULL UNIQUE,
    studentPasswd NVARCHAR(255) NOT NULL UNIQUE,
    studentNameFirst NVARCHAR(255) NOT NULL,
    studentNameLast NVARCHAR(255) NOT NULL,
);

CREATE TABLE CoursesEnrolled
(
    studentID INT NOT NULL FOREIGN KEY REFERENCES Students(studentID),
    courseID INT NOT NULL FOREIGN KEY REFERENCES Courses(courseID)
);

CREATE TABLE Administrators
(
    adminID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    adminEmail NVARCHAR(255) NOT NULL UNIQUE,
    adminPasswd NVARCHAR(255) NOT NULL UNIQUE,
    adminNameFirst NVARCHAR(255) NOT NULL,
    adminNameLast NVARCHAR(255) NOT NULL,
);
-- Make Tables END



-- Data Population START
INSERT INTO Courses
    (courseName, courseCode,courseTerm)
VALUES
    ('Project Management 1', 'PRO111', 1),
    ('C++ Programming Fundamentals', 'CPP111', 1),
    ('Computer Maintenance 1', 'COMP111', 1),
    ('Information Security 1', 'IS111', 1),
    ('Networking Basics', 'NET222', 2),
    ('Web Technology', 'WEB222', 2),
    ('Project Management 2', 'PRO222', 2),
    ('Advanced Project Management 1', 'PRO333', 3),
    ('Advanced C++ Programming Fundamentals', 'CPP333', 3),
    ('Advanced Computer Maintenance 1', 'COMP333', 3),
    ('Advanced Information Security 1', 'IS333', 3),
    ('Advanced Networking', 'NET444', 4),
    ('Advanced Computer Maintenance 2', 'COMP444', 4),
    ('Advanced Information Security 2', 'IS444', 4);

INSERT INTO Students
    (studentTerm, studentEmail, studentPasswd, studentNameFirst, studentNameLast)
VALUES
    (1, 'back@bvc.ca', 'backslide', 'Back', 'Slide'),
    (3, 'hyung@bvc.ca', 'hugology', 'Hyung', 'Su');

INSERT INTO Administrators
    (adminEmail, adminPasswd, adminNameFirst, adminNameLast)
VALUES
    ('jdm@bvc.ca', 're@|!+7_sets', 'Jon', 'Doe'),
    ('arkfx@bvc.ca', 'arkenfoxjs', 'Arken', 'Fox');

SELECT *
FROM Administrators
-- Data Population END

USE master
GO