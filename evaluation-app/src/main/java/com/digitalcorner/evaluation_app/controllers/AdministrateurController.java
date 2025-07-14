package com.digitalcorner.evaluation_app.controllers;


import com.digitalcorner.evaluation_app.dto.MailBody;
import com.digitalcorner.evaluation_app.dto.RequestResponse;
import com.digitalcorner.evaluation_app.entities.Administrateur;
import com.digitalcorner.evaluation_app.entities.ForgotPassword;
import com.digitalcorner.evaluation_app.entities.VilleCentre;
import com.digitalcorner.evaluation_app.repositories.AdministrateurRepository;
import com.digitalcorner.evaluation_app.repositories.ForgotPasswordRepository;
import com.digitalcorner.evaluation_app.repositories.VilleCentreRepository;
import com.digitalcorner.evaluation_app.services.AdministrateurService;
import com.digitalcorner.evaluation_app.services.MailService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;
import java.util.Random;

@RestController
public class AdministrateurController {
    @Autowired
    private AdministrateurService administrateurService;

    @Autowired
    private VilleCentreRepository villeCentreRepository;

    @Autowired
    private AdministrateurRepository administrateurRepository;

    @Autowired
    private ForgotPasswordRepository forgotPasswordRepository;

    @Autowired
    private MailService mailService;

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




    @PostMapping("/auth/forgotpassword/verifyMail/{email}")
    public ResponseEntity<String> verifyMail(@PathVariable String email){
        return administrateurService.verifyEmail(email);
    }


    @PostMapping("/auth/forgotpassword/verifyOTP/{otp}/{email}")
    public ResponseEntity<String> verifyOTP(@PathVariable Integer otp, @PathVariable String email){
        return administrateurService.verifyOTP(otp,email);
    }


    @PostMapping("/auth/forgotpassword/modifyPassword/{email}/{newPassword}")
    public ResponseEntity<String> modifyPassword(@PathVariable String email,@PathVariable String newPassword){
        return administrateurService.modifyPassword(newPassword, email);
    }


}
