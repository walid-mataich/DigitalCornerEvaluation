package com.digitalcorner.evaluation_app.dto;


import com.digitalcorner.evaluation_app.entities.Administrateur;
import com.digitalcorner.evaluation_app.entities.VilleCentre;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class RequestResponse {
    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String email;
    private String nom;
    private String prenom;
    private String password;
    private String role;
    private Long idCentre;
    private Administrateur administrateur;
    private VilleCentre villeCentre;
    private List<Administrateur> adminList;

}
