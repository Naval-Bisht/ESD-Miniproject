package com.naval.HostelAllocation.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "Hostel")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter


public class Hostel {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    @NonNull
    private String name;

    @Column(name = "floor")
    @NonNull
    private int floor;

    @Column(name = "room_number", unique = true)
    @NonNull
    private String room;

    @OneToOne
    @JoinColumn(name = "student_id")
    private Student student;

}
