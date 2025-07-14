package com.digitalcorner.evaluation_app.repositories;


import com.digitalcorner.evaluation_app.entities.Administrateur;
import com.digitalcorner.evaluation_app.entities.ForgotPassword;
import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

@Registered
public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword,Long> {

    @Query("select fp from ForgotPassword  fp where fp.otp =?1  and fp.administrateur = ?2")
    Optional<ForgotPassword> findByOtpAndAdministrateur(Integer otp, Administrateur administrateur);


    void deleteByAdministrateur(Administrateur administrateur);

    Optional<ForgotPassword> findByAdministrateur(Administrateur administrateur);


}
