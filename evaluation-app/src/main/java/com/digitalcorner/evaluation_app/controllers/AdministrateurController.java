package com.digitalcorner.evaluation_app.controllers;


import com.digitalcorner.evaluation_app.dto.RequestResponse;
import com.digitalcorner.evaluation_app.entities.Administrateur;
import com.digitalcorner.evaluation_app.entities.VilleCentre;
import com.digitalcorner.evaluation_app.repositories.VilleCentreRepository;
import com.digitalcorner.evaluation_app.services.AdministrateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class AdministrateurController {
    @Autowired
    private AdministrateurService administrateurService;

    @Autowired
    private VilleCentreRepository villeCentreRepository;

    @PostMapping("/auth/register/{centreId}")
    public ResponseEntity<RequestResponse> register(@RequestBody RequestResponse reg, @PathVariable Long centreId) {
        Optional<VilleCentre> CentreOpt = villeCentreRepository.findById(centreId);
        if(CentreOpt.isPresent()){
            reg.setVilleCentre(CentreOpt.get());
        }
        return ResponseEntity.ok(administrateurService.register(reg));
    }


    @PostMapping("/auth/login")
    public ResponseEntity<RequestResponse> login(@RequestBody RequestResponse req){
        return ResponseEntity.ok(administrateurService.login(req));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<RequestResponse> refreshToken(@RequestBody RequestResponse req){
        return ResponseEntity.ok(administrateurService.refreshToken(req));
    }

    @GetMapping("/superadmin/get-all-users")
    public ResponseEntity<RequestResponse> getAllUsers(){
        return ResponseEntity.ok(administrateurService.getAllAdmins());

    }

    @GetMapping("/superadmin/get-users/{userId}")
    public ResponseEntity<RequestResponse> getUSerByID(@PathVariable Long userId){
        return ResponseEntity.ok(administrateurService.getAdminById(userId));

    }

    @PutMapping("/superadmin/update/{userId}")
    public ResponseEntity<RequestResponse> updateUser(@PathVariable Long userId, @RequestBody Administrateur reqres){
        return ResponseEntity.ok(administrateurService.updateAdmin(userId, reqres));
    }

    @GetMapping("/adminsuperadmin/get-profile")
    public ResponseEntity<RequestResponse> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        RequestResponse response = administrateurService.getMyInfo(email);
        return  ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/superadmin/delete/{userId}")
    public ResponseEntity<RequestResponse> deleteUSer(@PathVariable Long userId){
        return ResponseEntity.ok(administrateurService.deleteAdmin(userId));
    }
}
