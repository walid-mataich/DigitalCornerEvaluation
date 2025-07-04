package com.digitalcorner.evaluation_app.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Administrateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAdministrateur;

    private String nom;

    private String prenom;

    private String password;

    private String email;

    enum Role{
        ADMIN,
        SUPERADMIN
    }

    @Enumerated(EnumType.STRING)
    private Role role;


}
