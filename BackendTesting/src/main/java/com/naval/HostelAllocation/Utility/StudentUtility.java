package com.naval.HostelAllocation.Utility;


import com.naval.HostelAllocation.Entities.Student;
import com.naval.HostelAllocation.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class StudentUtility {
    @Autowired
    public StudentRepository studentRepository;

    public List<Student> getAllStudents(){
        return (List<Student>) studentRepository.findAll();
    }

    public Student addStudent(Student students) {
        return studentRepository.save(students);
    }

}
