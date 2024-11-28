
START TRANSACTION;
SET time_zone = "+00:00";

SET FOREIGN_KEY_CHECKS = 0;

-- Drop tables in any order
DROP TABLE IF EXISTS `hostel`;
DROP TABLE IF EXISTS `student`;

-- Table structure for table `hostel`
CREATE TABLE `hostel` (
                          `id` int NOT NULL AUTO_INCREMENT,
                          `floor` int DEFAULT NULL,
                          `name` varchar(255) DEFAULT NULL,
                          `room_number` varchar(255) DEFAULT NULL,
                          `student_id` int DEFAULT NULL,
                          PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `student`
CREATE TABLE `student` (
                           `student_id` int NOT NULL AUTO_INCREMENT,
                           `cgpa` double DEFAULT NULL,
                           `total_credits` int DEFAULT NULL,
                           `email` varchar(255) DEFAULT NULL,
                           `first_name` varchar(255) DEFAULT NULL,
                           `last_name` varchar(255) DEFAULT NULL,
                           `password` varchar(255) DEFAULT NULL,
                           `photograph_path` varchar(255) DEFAULT NULL,
                           `roll_no` int DEFAULT NULL,
                           `graduation_year` int DEFAULT NULL,
                           PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


COMMIT ;
