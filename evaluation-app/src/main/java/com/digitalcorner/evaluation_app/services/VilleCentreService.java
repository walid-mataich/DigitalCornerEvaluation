package com.digitalcorner.evaluation_app.services;


import com.digitalcorner.evaluation_app.entities.VilleCentre;
import com.digitalcorner.evaluation_app.repositories.VilleCentreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VilleCentreService {
   final VilleCentreRepository villeCentreRepository;

    public VilleCentreService(VilleCentreRepository villeCentreRepository) {
        this.villeCentreRepository = villeCentreRepository;

    }


    public List<VilleCentre> getVilleCentres() {
        return villeCentreRepository.findAll();
    }
}
