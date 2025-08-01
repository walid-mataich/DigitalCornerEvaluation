package com.digitalcorner.evaluation_app.services;


import com.digitalcorner.evaluation_app.dto.MailBody;
import com.digitalcorner.evaluation_app.dto.RequestResponse;
import com.digitalcorner.evaluation_app.entities.Administrateur;
import com.digitalcorner.evaluation_app.entities.ForgotPassword;
import com.digitalcorner.evaluation_app.repositories.AdministrateurRepository;
import com.digitalcorner.evaluation_app.repositories.ForgotPasswordRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

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


    @Autowired
    private ForgotPasswordRepository  forgotPasswordRepository;


    @Autowired
    private MailService mailService;

    public RequestResponse register(RequestResponse registrationRequest){
        RequestResponse requestResponse = new RequestResponse();
        try {
            Administrateur administrateur = new Administrateur();
            administrateur.setNom(registrationRequest.getNom());
            administrateur.setPrenom(registrationRequest.getPrenom());
            administrateur.setEmail(registrationRequest.getEmail());
            administrateur.setRole(Administrateur.Role.ADMIN);
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
            if (admin.getRole().equals(Administrateur.Role.ADMIN)) {
                requestResponse.setIdCentre(admin.getVilleCentre().getIdCentre());
            }

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



    public ResponseEntity<String> verifyEmail(String email){
    Administrateur administrateur = administrateurRepository.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("please provide a valid email"));

    Integer OTP = otpGenerator();

    Optional<ForgotPassword> fpOpt = forgotPasswordRepository.findByAdministrateur(administrateur);


        if (fpOpt.isPresent()) {
            ForgotPassword fp = fpOpt.get();
            fp.setOtp(OTP);
            fp.setExpirationTime(new Date(System.currentTimeMillis() + 5 * 60 * 1000));
            forgotPasswordRepository.save(fp);
        } else {

            ForgotPassword fp = new ForgotPassword();
            fp.setAdministrateur(administrateur);
            fp.setOtp(OTP);
            fp.setExpirationTime(new Date(System.currentTimeMillis() + 5 * 60 * 1000));
            forgotPasswordRepository.save(fp);
        }

        String htmlBody =
                "<html>" +
                        "<body style=\"margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; background-color: #f4f4f4;\">" +
                        "<div style=\"max-width: 600px; margin: 40px auto; background-color: #ffffff; border: 1px solid #dcdcdc; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;\">" +
                        "<div style=\"padding: 30px;\">" +
                        "<h2 style=\"color: #2e7d32; margin-top: 0; text-align: center;\">Réinitialisation de votre mot de passe</h2>" +
                        "<p style=\"font-size: 16px; line-height: 1.6; color: #444;\">Bonjour,</p>" +
                        "<p style=\"font-size: 16px; line-height: 1.6; color: #444;\">" +
                        "Nous avons reçu une demande de réinitialisation de votre mot de passe. Pour continuer, veuillez utiliser le code de vérification ci-dessous :" +
                        "</p>" +
                        "<div style=\"text-align: center; margin: 30px 0;\">" +
                        "<span style=\"display: inline-block; background-color: #e8f5e9; border: 2px dashed #2e7d32; color: #2e7d32; font-size: 28px; font-weight: bold; padding: 12px 24px; border-radius: 8px; letter-spacing: 2px;\">" + OTP + "</span>" +
                        "</div>" +
                        "<p style=\"font-size: 14px; line-height: 1.6; color: #666;\">" +
                        "Ce code est valable pendant une durée limitée pour des raisons de sécurité. Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer ce message." +
                        "</p>" +
                        "<p style=\"font-size: 16px; line-height: 1.6; color: #444;\">Merci,<br/>L’équipe de support</p>" +
                        "</div>" +
                        "</div>" +
                        "</body>" +
                        "</html>";






        MailBody mailbody = MailBody.builder()
                .to(email)
                .subject("Réinitialisation de mot de passe - OTP Code")
                .text(htmlBody)
                .build();



        mailService.sendMail(mailbody);



    return ResponseEntity.ok("email sent for verification");
}


public ResponseEntity<String> verifyOTP(Integer otp, String email){

    Administrateur administrateur = administrateurRepository.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("please provide a valid email"));

    ForgotPassword fp = forgotPasswordRepository.findByOtpAndAdministrateur(otp,administrateur).orElseThrow(()-> new RuntimeException("invalid OTP for email : " + email));

    if (fp.getExpirationTime().before(Date.from(Instant.now()))){
        System.out.println("Trying to delete OTP with id: " + fp.getFpid());
        forgotPasswordRepository.deleteById(fp.getFpid());
        return new ResponseEntity<>("Otp has expired", HttpStatus.EXPECTATION_FAILED);
    }

    return ResponseEntity.ok("Otp verified !");
}

public ResponseEntity<String> modifyPassword(String newPassword, String email){
        Optional<Administrateur> adminOpt = administrateurRepository.findByEmail(email);

        if (adminOpt.isPresent()) {
            Administrateur admin = adminOpt.get();
            admin.setPassword(passwordEncoder.encode(newPassword));
            administrateurRepository.save(admin);
            return ResponseEntity.ok("password modified successfully");
        }

    return new ResponseEntity<>("Failde to modify password", HttpStatus.EXPECTATION_FAILED);

}


    private Integer otpGenerator(){
        Random random = new Random();
        return random.nextInt(100_000,999_999);
    }


    public Optional<Administrateur> getAdministrateurById(Long id) {
        return administrateurRepository.findById(id);
    }

    public Administrateur updateAdministrateur(Long id, Administrateur updatedAdmin) {
        return administrateurRepository.findById(id)
                .map(admin -> {
                    admin.setNom(updatedAdmin.getNom());
                    admin.setPrenom(updatedAdmin.getPrenom());
                    admin.setEmail(updatedAdmin.getEmail());
                    admin.setRole(updatedAdmin.getRole());
//                    admin.setVilleCentre(updatedAdmin.getVilleCentre());
                    // Ne pas oublier de gérer le password ailleurs si besoin
                    return administrateurRepository.save(admin);
                }).orElseThrow(() -> new RuntimeException("Administrateur non trouvé avec l'id " + id));
    }

    public void deleteAdministrateur(Long id) {
        if (!administrateurRepository.existsById(id)) {
            throw new RuntimeException("Administrateur non trouvé avec l'id " + id);
        }
        administrateurRepository.deleteById(id);
    }


}
