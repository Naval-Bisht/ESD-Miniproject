package com.naval.HostelAllocation.Controller;

import com.naval.HostelAllocation.Entities.Hostel;
import com.naval.HostelAllocation.Entities.Student;
import com.naval.HostelAllocation.Repository.HostelRepository;
import com.naval.HostelAllocation.Repository.StudentRepository;
import com.naval.HostelAllocation.Utility.HostelUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/hostel")
@Configurable

public class HostelController {
    @Autowired
    public HostelUtility hostelUtility;


    @Autowired
    public StudentRepository studentRepository;

    @Autowired
    private HostelRepository hostelRepository;

    @PostMapping(value = "/add")
    public ResponseEntity<Hostel> AddHostel(@RequestBody Hostel hostel){
        try{
            Boolean hostelExist = HostelExists(hostel);
            if(Boolean.TRUE.equals(hostelExist)) {
                return ResponseEntity.status(500).build();
            }
            Hostel result = hostelUtility.addHostel(hostel);
            return ResponseEntity.of(Optional.of(result));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    public Boolean HostelExists(@RequestBody Hostel hostel){
        try{
            List<Hostel> hostelList = GetAllHostel().getBody();
            assert hostelList != null;
            for(Hostel hostel1: hostelList) {
                if(hostel1.getFloor() == (hostel.getFloor()) && hostel1.getRoom() == (hostel.getRoom())
                && hostel.getName().equals(hostel1.getName())) {
                    return true;
                }
            }
            return false;
        }
        catch (Exception e) {
            return null;
        }
    }

    @GetMapping(value = "/get-all")
    public ResponseEntity<List<Hostel>> GetAllHostel() {
        try{
            List<Hostel> result = hostelUtility.getAllHostels();
            return ResponseEntity.of(Optional.of(result));
        }
        catch(Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping(value = "/get/{id}")
    public ResponseEntity<Optional<Hostel>> GetHostel(@PathVariable int id) {
        try{
            boolean existHostel = hostelUtility.existHostel(id);
            if(!existHostel){
                return ResponseEntity.status(500).build();
            }
            Optional<Hostel> result = hostelUtility.getHostel(id);
            return ResponseEntity.of(Optional.of(result));
        }
        catch(Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping(value = "/update/{hostelId}/{studentId}")
    public ResponseEntity<Boolean> UpdateHostel(
            @PathVariable int hostelId,
            @PathVariable(required = false) String studentId // Marking it as not required
    ) {
        try {
            Optional<Hostel> existHostel = hostelUtility.getHostel(hostelId);
            if (existHostel.isEmpty()) {
                return ResponseEntity.ok(false);
            }

            if (Objects.equals(studentId, "null")) {
                Optional<Hostel> existingHostelOptional = hostelRepository.findById(hostelId);
                if (existingHostelOptional.isPresent()) {
                    Hostel existingHostel = existingHostelOptional.get();
                    existingHostel.setStudent(null); // Set the student reference to null
                    hostelRepository.save(existingHostel); // Save the updated hostel
                    return ResponseEntity.ok(true);
                }
            } else {
                // StudentId is provided, associate the student with the hostel
                int Id2 =  Integer.parseInt(studentId);
                Optional<Student> updatedStudentOptional = studentRepository.findById(Id2);
                if (existHostel.get().getId() == hostelId && updatedStudentOptional.isPresent()) {
                    Student updatedStudent = updatedStudentOptional.get();
                    Optional<Hostel> existingHostelOptional = hostelRepository.findById(hostelId);
                    if (existingHostelOptional.isPresent()) {
                        Hostel existingHostel = existingHostelOptional.get();
                        existingHostel.setStudent(updatedStudent);
                        hostelRepository.save(existingHostel);
                        return ResponseEntity.ok(true);
                    }
                }
            }
            return ResponseEntity.ok(false);
        } catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }



    @GetMapping("/update")
    public ResponseEntity<List<Student>> getAllStudentsWithoutHostel() {
        try {
            List<Student> studentsWithoutHostel = studentRepository.findStudentsWithoutHostel();
            if (studentsWithoutHostel.isEmpty()) {
                return ResponseEntity.noContent().build(); // Return 204 if no students found
            }
            return ResponseEntity.ofNullable(studentsWithoutHostel);
        } catch(Exception e) {
            return ResponseEntity.status(500).build();
        }
    }



    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<String> DeleteDepartment(@PathVariable int id){
        try{
            boolean existHostel = hostelUtility.existHostel(id);
            if(!existHostel){
                return ResponseEntity.status(500).build();
            }
            hostelUtility.deleteHostel(id);
            return ResponseEntity.of(Optional.of("{'status': 'success'}"));
        }
        catch (Exception e){
            return ResponseEntity.of(Optional.of("{ 'status' : 'failure'}"));
        }
    }
}
