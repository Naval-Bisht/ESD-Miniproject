package com.naval.HostelAllocation.Repository;


import com.naval.HostelAllocation.Entities.Hostel;
import com.naval.HostelAllocation.Entities.Student;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface StudentRepository extends CrudRepository<Student, Integer> {
    @Query("SELECT s FROM Student s WHERE s.st_id NOT IN (SELECT h.student.st_id FROM Hostel h where h.student.st_id is not null)")
    List<Student> findStudentsWithoutHostel();

    @Query("SELECT s FROM Student s LEFT JOIN Hostel h ON s.st_id = h.student.st_id WHERE s.email = ?1")
    Student findStudentByEmail(String email);

    @Query("SELECT h FROM Student s LEFT JOIN Hostel h ON s.st_id = h.student.st_id WHERE s.email = ?1")
    Hostel findHostelByEmail(String email);

}
