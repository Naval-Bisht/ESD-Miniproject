START TRANSACTION;

-- Dumping data for table `hostel`
INSERT INTO `hostel` (`id`, `floor`, `name`, `room_number`, `student_id`) VALUES
                                                                              (1, 1, 'Hostel A', '101', 1),
                                                                              (3, 1, 'Hostel A', '103', 3),
                                                                              (2, 1, 'Hostel A', '104', NULL),
                                                                              (4, 1, 'Hostel A', '105', NULL),
                                                                              (5, 2, 'Hostel B', '201', 4),
                                                                              (6, 2, 'Hostel B', '202', 5),
                                                                              (7, 2, 'Hostel B', '203', 6),
                                                                              (8, 3, 'Hostel C', '301', 7),
                                                                              (9, 3, 'Hostel C', '302', 8),
                                                                              (10, 3, 'Hostel C', '303', 9),
                                                                              (11, 4, 'Hostel D', '401', 10),
                                                                              (12, 4, 'Hostel D', '402', 11),
                                                                              (13, 4, 'Hostel D', '403', 12),
                                                                              (14, 5, 'Hostel E', '501', 13),
                                                                              (15, 5, 'Hostel E', '502', 14);

-- Dumping data for table `student`
INSERT INTO `student` (`student_id`, `cgpa`, `total_credits`, `email`, `first_name`, `last_name`, `password`, `photograph_path`, `roll_no`, `graduation_year`) VALUES
                                                                                                                                                                   (1, 8.5, 120, 'johndoe@example.com', 'John', 'Doe', '$2a$10$N9y1fZNzyLaVazDw6djprO/WhFKWp8tIKzvIRP7NTgYEPvDyp.CQ6', '/images/johndoe.jpg', 101, 2024),
                                                                                                                                                                   (3, 8.5, 120, 'abc@a.com', 'John', 'Doe', '$2a$10$N9y1fZNzyLaVazDw6djprO/WhFKWp8tIKzvIRP7NTgYEPvDyp.CQ6', '/images/johndoe.jpg', 102, 2024),
                                                                                                                                                                   (2, 8.5, 120, 'naval@a.com', 'Naval', 'Doe', '$2a$10$N9y1fZNzyLaVazDw6djprO/WhFKWp8tIKzvIRP7NTgYEPvDyp.CQ6', '/images/johndoe.jpg', 102, 2024),
                                                                                                                                                                   (4, 8.4, 115, 'alex@a.com', 'Alex', 'Smith', '$2a$10$N9y1fZNzyLaVazDw6djprO/WhFKWp8tIKzvIRP7NTgYEPvDyp.CQ6', '/images/alex.jpg', 103, 2024),
                                                                                                                                                                   (5, 8.3, 110, 'susan@a.com', 'Susan', 'Lee', '$2a$10$N9y1fZNzyLaVazDw6djprO/WhFKWp8tIKzvIRP7NTgYEPvDyp.CQ6', '/images/susan.jpg', 104, 2024),
                                                                                                                                                                   (6, 8.6, 125, 'peter@a.com', 'Peter', 'Johnson', '$2a$10$N9y1fZNzyLaVazDw6djprO/WhFKWp8tIKzvIRP7NTgYEPvDyp.CQ6', '/images/peter.jpg', 105, 2024),
                                                                                                                                                                   (7, 8.0, 105, 'david@a.com', 'David', 'Brown', '$2a$10$N9y1fZNzyLaVazDw6djprO/WhFKWp8tIKzvIRP7NTgYEPvDyp.CQ6', '/images/david.jpg', 106, 2024),
                                                                                                                                                                   (8, 8.7, 130, 'emma@a.com', 'Emma', 'Williams', '$2a$10$N9y1fZNzyLaVazDw6djprO/WhFKWp8tIKzvIRP7NTgYEPvDyp.CQ6', '/images/emma.jpg', 107, 2024),
                                                                                                                                                                   (9, 8.2, 110, 'jack@a.com', 'Jack', 'Miller', '$2a$10$N9y1fZNzyLaVazDw6djprO/WhFKWp8tIKzvIRP7NTgYEPvDyp.CQ6', '/images/jack.jpg', 108, 2024),
                                                                                                                                                                   (10, 8.4, 120, 'sophie@a.com', 'Sophie', 'Taylor', '$2a$10$N9y1fZNzyLaVazDw6djprO/WhFKWp8tIKzvIRP7NTgYEPvDyp.CQ6', '/images/sophie.jpg', 109, 2024),
                                                                                                                                                                   (11, 8.1, 100, 'will@a.com', 'Will', 'Davis', '$2a$10$N9y1fZNzyLaVazDw6djprO/WhFKWp8tIKzvIRP7NTgYEPvDyp.CQ6', '/images/will.jpg', 110, 2024),
                                                                                                                                                                   (12, 8.3, 115, 'lily@a.com', 'Lily', 'Morris', '$2a$10$N9y1fZNzyLaVazDw6djprO/WhFKWp8tIKzvIRP7NTgYEPvDyp.CQ6', '/images/lily.jpg', 111, 2024),
                                                                                                                                                                   (13, 8.0, 105, 'robert@a.com', 'Robert', 'Garcia', '$2a$10$N9y1fZNzyLaVazDw6djprO/WhFKWp8tIKzvIRP7NTgYEPvDyp.CQ6', '/images/robert.jpg', 112, 2024),
                                                                                                                                                                   (14, 8.6, 130, 'lisa@a.com', 'Lisa', 'Martinez', '$2a$10$N9y1fZNzyLaVazDw6djprO/WhFKWp8tIKzvIRP7NTgYEPvDyp.CQ6', '/images/lisa.jpg', 113, 2024);


COMMIT ;