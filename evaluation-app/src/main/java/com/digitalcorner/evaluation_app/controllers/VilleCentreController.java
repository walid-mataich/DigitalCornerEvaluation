package com.digitalcorner.evaluation_app.controllers;


import com.digitalcorner.evaluation_app.dto.AllCentersResponce;
import com.digitalcorner.evaluation_app.dto.CentreResponse;
import com.digitalcorner.evaluation_app.entities.VilleCentre;
import com.digitalcorner.evaluation_app.services.VilleCentreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/superadmin/centres")
public class VilleCentreController {
    final VilleCentreService villeCentreService;

    public VilleCentreController(VilleCentreService villeCentreService) {
        this.villeCentreService = villeCentreService;
    }


    @GetMapping
    public List<VilleCentre> getVilleCentres() {
        return villeCentreService.getVilleCentres();
    }


    @GetMapping("/data")
    public List<CentreResponse> getCentresData(){
        return villeCentreService.getCentreData();
    }

    @GetMapping("/total")
    public AllCentersResponce getTotal() {
        return  villeCentreService.getGeneralCenterData();
    }
}
