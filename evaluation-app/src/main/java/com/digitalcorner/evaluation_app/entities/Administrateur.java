package com.digitalcorner.evaluation_app.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Administrateur {
    @Id
    private Long idAdministrateur;

    private String nom;

    private String prenom;

    private String password;

    private String email;


}
