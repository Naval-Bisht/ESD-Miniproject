package com.naval.HostelAllocation.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.Optional;


@Entity(name = "Student")
//@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class Student {

    @Id
    @Column(name = "student_id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int st_id;

    @Column(name = "roll_no", unique = true)
    @NonNull
    private int roll;

    @Column(name = "first_name")
    @NonNull
    private String fname;

    @Column(name = "last_name")
    private String lname;

    @Column(name = "email", unique = true)
    @NonNull
    private String email;

    @Column(name = "password")
    @NonNull
    private String pass;

    @Column(name = "photograph_path")
    private String photo;

    @Column(name = "cgpa")
    @Builder.Default
    private double cgpa = 0.0;

    @Column(name = "total_credits")
    @NonNull
    private int credit;

    @Column(name = "graduation_year")
    private int year;

    public Student() {

    }
}
