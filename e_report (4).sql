-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 13, 2023 at 05:17 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e_report`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `attendance_id` int(11) NOT NULL,
  `enroll_id` int(11) NOT NULL,
  `nim` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `class_id` int(11) NOT NULL,
  `class_name` varchar(255) NOT NULL,
  `total_student` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`class_id`, `class_name`, `total_student`) VALUES
(1, 'LA20', 30),
(2, 'LB20', 30),
(3, 'LC20', 39);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `semester_credit_unit` smallint(6) NOT NULL,
  `total_attendance` smallint(6) NOT NULL,
  `semester` smallint(6) NOT NULL,
  `major` enum('CS','BC','DKV') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `course_name`, `semester_credit_unit`, `total_attendance`, `semester`, `major`) VALUES
(1, 'Computer Network', 4, 12, 3, 'CS'),
(2, 'Algorithm & Programming', 4, 14, 1, 'CS'),
(3, 'Program Design Method', 2, 13, 1, 'CS'),
(4, 'Calculus', 4, 24, 2, 'CS'),
(5, 'Database', 4, 22, 3, 'CS');

-- --------------------------------------------------------

--
-- Table structure for table `enrolls`
--

CREATE TABLE `enrolls` (
  `enroll_id` int(11) NOT NULL,
  `nim` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `lecturer_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `attendance_count` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `enrolls`
--

INSERT INTO `enrolls` (`enroll_id`, `nim`, `class_id`, `lecturer_id`, `course_id`, `status`, `attendance_count`) VALUES
(1, 260000001, 1, 1, 1, 'active', 1),
(2, 260000001, 1, 2, 2, 'active', 0),
(3, 260000000, 2, 1, 2, 'active', 0),
(4, 260000001, 3, 1, 4, 'active', 0),
(5, 260000000, 3, 2, 3, 'active', 0),
(6, 260000000, 2, 2, 1, 'active', 0),
(7, 260000000, 2, 2, 4, 'active', 0),
(8, 260000000, 2, 1, 5, 'active', 0),
(9, 270000000, 2, 2, 2, 'active', 0),
(10, 270000000, 2, 1, 3, 'active', 0),
(11, 270000001, 2, 1, 2, 'active', 0);

-- --------------------------------------------------------

--
-- Table structure for table `ipks`
--

CREATE TABLE `ipks` (
  `ipk_id` int(11) NOT NULL,
  `nim` int(11) NOT NULL,
  `ipk_semester` tinyint(4) NOT NULL,
  `ipk_score` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `lecturers`
--

CREATE TABLE `lecturers` (
  `lecturer_id` int(11) NOT NULL,
  `lecturer_name` varchar(255) NOT NULL,
  `lecturer_age` smallint(6) NOT NULL,
  `lecturer_address` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lecturers`
--

INSERT INTO `lecturers` (`lecturer_id`, `lecturer_name`, `lecturer_age`, `lecturer_address`) VALUES
(1, 'Agustinus', 69, 'Johnny Road 25'),
(2, 'Wina Permana Saris', 29, 'Zazamall');

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `score_id` int(11) NOT NULL,
  `score_semester` tinyint(4) NOT NULL,
  `enroll_id` int(11) NOT NULL,
  `score` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`score_id`, `score_semester`, `enroll_id`, `score`) VALUES
(1, 1, 1, 98),
(2, 1, 2, 80),
(3, 1, 3, 100),
(4, 2, 4, NULL),
(5, 1, 5, 79),
(6, 1, 6, 65),
(7, 2, 7, 89),
(8, 3, 8, 90),
(9, 1, 9, NULL),
(10, 1, 10, NULL),
(11, 1, 11, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_nim` int(11) NOT NULL,
  `student_name` varchar(255) NOT NULL,
  `student_age` int(11) NOT NULL,
  `student_gender` varchar(255) NOT NULL,
  `student_address` longtext NOT NULL,
  `student_place_of_birth` varchar(255) NOT NULL,
  `student_date_of_birth` date NOT NULL,
  `city` varchar(255) NOT NULL,
  `major` enum('CS','BC','DKV') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_nim`, `student_name`, `student_age`, `student_gender`, `student_address`, `student_place_of_birth`, `student_date_of_birth`, `city`, `major`) VALUES
(260000000, 'Zazant ZazmiZa', 24, 'Male', 'ZazaLand, Baka', 'Zazabaya', '2003-08-02', 'Za York', 'CS'),
(260000001, 'Arvel', 19, 'Male', 'Batu', 'Batu', '2022-11-16', 'Batu', 'CS'),
(270000000, 'Vincent Sasmito', 21, 'Male', 'ZuzzyVille', 'Zazaland', '2022-12-31', 'Medan', 'CS'),
(270000001, 'Vincentus', 21, 'Female', 'Zaza', 'Sussus Amogus 2.0', '2022-12-28', 'Surabaya', 'CS');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`) VALUES
(1, 'admin', 'example@example.com', '$2b$10$Ryh68xADtij5ZiBJKWmxOep3p4Rfi7CvBQhOQD9hatXY6spWn42TG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJhZG1pbiIsImVtYWlsVXNlciI6ImV4YW1wbGVAZXhhbXBsZS5jb20iLCJpYXQiOjE2NzM2MjQ3MzEsImV4cCI6MTY3MzcxMTEzMX0.rHtLb-q6EwV_gwdmS-nr2VmzwFF539cZxFluDQSXgFs');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`attendance_id`),
  ADD KEY `enroll_id` (`enroll_id`),
  ADD KEY `nim` (`nim`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`class_id`),
  ADD UNIQUE KEY `class_name` (`class_name`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `enrolls`
--
ALTER TABLE `enrolls`
  ADD PRIMARY KEY (`enroll_id`),
  ADD KEY `nim` (`nim`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `lecturer_id` (`lecturer_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `ipks`
--
ALTER TABLE `ipks`
  ADD PRIMARY KEY (`ipk_id`),
  ADD KEY `nim` (`nim`);

--
-- Indexes for table `lecturers`
--
ALTER TABLE `lecturers`
  ADD PRIMARY KEY (`lecturer_id`);

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`score_id`),
  ADD KEY `enroll_id` (`enroll_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_nim`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `enrolls`
--
ALTER TABLE `enrolls`
  MODIFY `enroll_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `ipks`
--
ALTER TABLE `ipks`
  MODIFY `ipk_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lecturers`
--
ALTER TABLE `lecturers`
  MODIFY `lecturer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `score_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`enroll_id`) REFERENCES `enrolls` (`enroll_id`),
  ADD CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`nim`) REFERENCES `students` (`student_nim`);

--
-- Constraints for table `enrolls`
--
ALTER TABLE `enrolls`
  ADD CONSTRAINT `enrolls_ibfk_1` FOREIGN KEY (`nim`) REFERENCES `students` (`student_nim`),
  ADD CONSTRAINT `enrolls_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`),
  ADD CONSTRAINT `enrolls_ibfk_3` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`lecturer_id`),
  ADD CONSTRAINT `enrolls_ibfk_4` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Constraints for table `ipks`
--
ALTER TABLE `ipks`
  ADD CONSTRAINT `ipks_ibfk_1` FOREIGN KEY (`nim`) REFERENCES `students` (`student_nim`);

--
-- Constraints for table `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`enroll_id`) REFERENCES `enrolls` (`enroll_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
