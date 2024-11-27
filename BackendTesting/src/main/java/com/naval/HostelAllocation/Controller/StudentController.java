package com.naval.HostelAllocation.Controller;

import com.naval.HostelAllocation.DTO.StudentDetailDTO;
import com.naval.HostelAllocation.Entities.Hostel;
import com.naval.HostelAllocation.Entities.Student;
import com.naval.HostelAllocation.Repository.StudentRepository;
import com.naval.HostelAllocation.Utility.StudentUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/student")
@Configurable

public class StudentController {
    public Student student;
    @Autowired
    public StudentUtility studentUtility;

    @Autowired
    public PasswordEncoder passwordEncoder;

    @Autowired
    public StudentRepository studentRepository;

    @GetMapping("/all-students")
    public ResponseEntity<List<Student>> GetAllStudents(){
        try{
            List<Student> result = studentUtility.getAllStudents();
            return ResponseEntity.of(Optional.of(result));
        }
        catch(Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/add-student")
    public ResponseEntity<Student> AddHostel(@RequestBody Student student){
        try{
            String encrypted = student.getPass();
            encrypted = passwordEncoder.encode(encrypted);
            student.setPass(encrypted);
            Boolean studentExist = StudentExists(student);
            if(Boolean.TRUE.equals(studentExist)) {
                return ResponseEntity.status(500).build();
            }
            Student result = studentUtility.addStudent(student);
            return ResponseEntity.of(Optional.of(result));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    public Boolean StudentExists(@RequestBody Student student){
        try{
            List<Student> studentList = GetAllStudents().getBody();
            assert studentList != null;
            for(Student student1: studentList) {
                if(student1.getEmail().equals(student.getEmail())) {
                    return true;
                }
            }
            return false;
        }
        catch (Exception e) {
            return null;
        }
    }

    @GetMapping("/student-detail/{email}")
    public ResponseEntity<Optional<StudentDetailDTO>> GetStudentDetail(@PathVariable String email){
        try{
            Student student1 = studentRepository.findStudentByEmail(email);
            Hostel hostel = studentRepository.findHostelByEmail(email);
            StudentDetailDTO studentDetailDTO = prepareSHDTO(student1, hostel);
            return ResponseEntity.of(Optional.of(Optional.of(studentDetailDTO)));
        }
        catch(Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    StudentDetailDTO prepareSHDTO(Student student, Hostel hostel) {
        StudentDetailDTO studentDetailDTO = new StudentDetailDTO();
        studentDetailDTO.photo = student.getPhoto();
        studentDetailDTO.student_id = student.getSt_id();
        studentDetailDTO.first_name = student.getFname();
        studentDetailDTO.last_name = student.getLname();
        studentDetailDTO.roll_no = student.getRoll();
        studentDetailDTO.year = student.getYear();
        studentDetailDTO.email = student.getEmail();
        studentDetailDTO.hostel_id = null;
        studentDetailDTO.hostel_name = null;
        studentDetailDTO.floor = null;
        studentDetailDTO.room = null;
        if(hostel != null) {
            studentDetailDTO.hostel_id = hostel.getId();
            studentDetailDTO.hostel_name = hostel.getName();
            studentDetailDTO.floor = hostel.getFloor();
            studentDetailDTO.room = hostel.getRoom();
        }
        return studentDetailDTO;
    }
}
