package com.naval.HostelAllocation.Utility;

import com.naval.HostelAllocation.Entities.Hostel;
import com.naval.HostelAllocation.Repository.HostelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HostelUtility {
    @Autowired
    public HostelRepository hostelRepository;

    public Hostel addHostel(Hostel hostels) {
        return hostelRepository.save(hostels);
    }

    public List<Hostel> getAllHostels(){
        return (List<Hostel>) hostelRepository.findAll();
    }

    public boolean existHostel(int id) { return (boolean) hostelRepository.existsById(id); }
    public Optional<Hostel> getHostel(int id){ return (Optional<Hostel>) hostelRepository.findById(id); }

    public void deleteHostel(int id){ hostelRepository.deleteById(id); }
}
