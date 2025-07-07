package com.digitalcorner.evaluation_app.services;


import com.digitalcorner.evaluation_app.dto.RequestResponse;
import com.digitalcorner.evaluation_app.entities.Administrateur;
import com.digitalcorner.evaluation_app.repositories.AdministrateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class AdministrateurService {

    @Autowired
    private AdministrateurRepository administrateurRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder passwordEncoder;

    public RequestResponse register(RequestResponse registrationRequest){
        RequestResponse requestResponse = new RequestResponse();
        try {
            Administrateur administrateur = new Administrateur();
            administrateur.setNom(registrationRequest.getNom());
            administrateur.setPrenom(registrationRequest.getPrenom());
            administrateur.setEmail(registrationRequest.getEmail());
            administrateur.setRole(Administrateur.Role.SUPERADMIN);
            administrateur.setVilleCentre(registrationRequest.getVilleCentre());
            administrateur.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            Administrateur saved = administrateurRepository.save(administrateur);
            if(saved.getIdAdministrateur()>0){
                requestResponse.setAdministrateur(saved);
                requestResponse.setMessage("user saved successfully");
                requestResponse.setStatusCode(200);
            }

        }catch (Exception e){
            requestResponse.setStatusCode(500);
            requestResponse.setError(e.getMessage());
        }

        return requestResponse;
    }

    public RequestResponse login(RequestResponse loginRequest){
        RequestResponse requestResponse = new RequestResponse();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                    loginRequest.getPassword()));
            var admin = administrateurRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(admin);
            var refreshToken = jwtUtils.generteRefreshToken(new HashMap<>(),admin);
            requestResponse.setStatusCode(200);
            requestResponse.setToken(jwt);
            requestResponse.setRole(admin.getRole().name());
            requestResponse.setRefreshToken(refreshToken);
            requestResponse.setExpirationTime("24Hrs");
            requestResponse.setMessage("user logged in successfully !");
        }catch (Exception e){
            requestResponse.setStatusCode(500);
            requestResponse.setError(e.getMessage());
        }
        return requestResponse;
    }

    public RequestResponse refreshToken(RequestResponse refreshTokenRequest){
        RequestResponse requestResponse = new RequestResponse();
        try{
            String email = jwtUtils.extractUsername(refreshTokenRequest.getToken());
            Administrateur admin = administrateurRepository.findByEmail(email).orElseThrow();
            if (jwtUtils.isTokenValid(refreshTokenRequest.getToken(), admin)) {
                var jwt = jwtUtils.generateToken(admin);
                requestResponse.setStatusCode(200);
                requestResponse.setToken(jwt);
                requestResponse.setRefreshToken(refreshTokenRequest.getToken());
                requestResponse.setExpirationTime("24Hr");
                requestResponse.setMessage("Successfully Refreshed Token");
            }
            requestResponse.setStatusCode(200);
            return requestResponse;

        }catch (Exception e){
            requestResponse.setStatusCode(500);
            requestResponse.setMessage(e.getMessage());
            return requestResponse;
        }
    }

    public RequestResponse getAllAdmins() {
        RequestResponse requestResponse = new RequestResponse();

        try {
            List<Administrateur> result = administrateurRepository.findAll();
            if (!result.isEmpty()) {
                requestResponse.setAdminList(result);
                requestResponse.setStatusCode(200);
                requestResponse.setMessage("Successful");
            } else {
                requestResponse.setStatusCode(404);
                requestResponse.setMessage("No admin found");
            }
            return requestResponse;
        } catch (Exception e) {
            requestResponse.setStatusCode(500);
            requestResponse.setMessage("Error occurred: " + e.getMessage());
            return requestResponse;
        }
    }

    public RequestResponse getAdminById(Long id) {
        RequestResponse reqRes = new RequestResponse();
        try {
            Administrateur adminById = administrateurRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));
            reqRes.setAdministrateur(adminById);
            reqRes.setStatusCode(200);
            reqRes.setMessage("Users with id '" + id + "' found successfully");
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
        }
        return reqRes;
    }

    public RequestResponse deleteAdmin(Long adminId) {
        RequestResponse requestResponse = new RequestResponse();
        try {
            Optional<Administrateur> adminOpt = administrateurRepository.findById(adminId);
            if (adminOpt.isPresent()) {
                administrateurRepository.deleteById(adminId);
                requestResponse.setStatusCode(200);
                requestResponse.setMessage("User deleted successfully");
            } else {
                requestResponse.setStatusCode(404);
                requestResponse.setMessage("User not found for deletion");
            }
        } catch (Exception e) {
            requestResponse.setStatusCode(500);
            requestResponse.setMessage("Error occurred while deleting user: " + e.getMessage());
        }
        return requestResponse;
    }
    public RequestResponse updateAdmin(Long adminId, Administrateur updatedAdmin) {
        RequestResponse reqRes = new RequestResponse();
        try {
            Optional<Administrateur> userOptional = administrateurRepository.findById(adminId);
            if (userOptional.isPresent()) {
                Administrateur existingUser = userOptional.get();
                existingUser.setEmail(updatedAdmin.getEmail());
                existingUser.setNom(updatedAdmin.getNom());
                existingUser.setPrenom(updatedAdmin.getPrenom());
                existingUser.setRole(updatedAdmin.getRole());

                // Check if password is present in the request
                if (updatedAdmin.getPassword() != null && !updatedAdmin.getPassword().isEmpty()) {
                    // Encode the password and update it
                    existingUser.setPassword(passwordEncoder.encode(updatedAdmin.getPassword()));
                }

                Administrateur savedUser = administrateurRepository.save(existingUser);
                reqRes.setAdministrateur(savedUser);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User updated successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while updating user: " + e.getMessage());
        }
        return reqRes;
    }
    public RequestResponse getMyInfo(String email){
        RequestResponse reqRes = new RequestResponse();
        try {
            Optional<Administrateur> userOptional = administrateurRepository.findByEmail(email);
            if (userOptional.isPresent()) {
                reqRes.setAdministrateur(userOptional.get());
                reqRes.setStatusCode(200);
                reqRes.setMessage("successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }

        }catch (Exception e){
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while getting user info: " + e.getMessage());
        }
        return reqRes;

    }


}
