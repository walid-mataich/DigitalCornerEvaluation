package com.digitalcorner.evaluation_app.controllers;


import com.digitalcorner.evaluation_app.entities.VilleCentre;
import com.digitalcorner.evaluation_app.services.EvaluationService;
import com.digitalcorner.evaluation_app.services.VilleCentreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/centres")
public class VilleCentreController {
    final VilleCentreService villeCentreService;

    public VilleCentreController(VilleCentreService villeCentreService) {
        this.villeCentreService = villeCentreService;
    }


    @GetMapping
    public List<VilleCentre> getVilleCentres() {
        return villeCentreService.getVilleCentres();
    }
}
