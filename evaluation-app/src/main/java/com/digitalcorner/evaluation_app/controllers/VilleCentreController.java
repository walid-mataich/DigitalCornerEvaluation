package com.digitalcorner.evaluation_app.controllers;


import com.digitalcorner.evaluation_app.dto.CentersResponce;
import com.digitalcorner.evaluation_app.dto.CentreResponse;
import com.digitalcorner.evaluation_app.entities.VilleCentre;
import com.digitalcorner.evaluation_app.repositories.VilleCentreRepository;
import com.digitalcorner.evaluation_app.services.VilleCentreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adminsuperadmin/centres")
public class VilleCentreController {
    final VilleCentreService villeCentreService;
    final VilleCentreRepository villeCentreRepository;

    public VilleCentreController(VilleCentreService villeCentreService, VilleCentreRepository villeCentreRepository) {
        this.villeCentreService = villeCentreService;
        this.villeCentreRepository = villeCentreRepository;
    }


    @GetMapping
    public List<VilleCentre> getVilleCentres() {
        return villeCentreService.getVilleCentres();
    }

    @GetMapping("/getCentre/{id}")
    public VilleCentre getVc(@PathVariable Long id){
        return villeCentreRepository.findById(id).orElse(null);
    }


    @GetMapping("/data")
    public List<CentreResponse> getCentresData(){
        return villeCentreService.getCentreData();
    }

    @GetMapping("/total")
    public CentersResponce getTotal() {
        return  villeCentreService.getGeneralCenterData(null);
    }

    @GetMapping("/centreData/{id}")
    public CentersResponce getCentreData(@PathVariable Long id) {
        return villeCentreService.getGeneralCenterData(id);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addCentre(@RequestBody VilleCentre vc) {
        try {
            villeCentreService.addCentre(vc);
            return ResponseEntity.status(HttpStatus.CREATED).body("Centre ajouté avec succès.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Données invalides : " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de l'ajout du centre : " + e.getMessage());
        }
    }
    @PutMapping("/modify/{id}")
    public ResponseEntity<String> updateCentre(@PathVariable Long id, @RequestBody VilleCentre updatedCentre) {
        villeCentreService.updateCentre(id, updatedCentre);
        return ResponseEntity.ok("Centre modifié avec succès.");
    }

    // Supprimer un centre
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCentre(@PathVariable Long id) {
        villeCentreService.deleteCentre(id);
        return ResponseEntity.ok("Centre supprimé avec succès.");
    }
}
