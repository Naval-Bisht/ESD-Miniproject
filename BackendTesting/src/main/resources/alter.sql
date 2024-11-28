-- Foreign key constraints

START TRANSACTION;
ALTER TABLE `hostel`
    ADD CONSTRAINT `FK_hostel_student`
        FOREIGN KEY (`student_id`)
            REFERENCES `student` (`student_id`);
COMMIT;