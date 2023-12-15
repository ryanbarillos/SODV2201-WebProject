/*
    SQL File to conduct test queries
*/
USE SODV2201_Group3;
GO

SELECT *
FROM Courses

SELECT *
FROM CoursesEnrolled
WHERE StudentID = 1

SELECT *
FROM Courses
ORDER BY CourseTerm, CourseName

USE master;
GO