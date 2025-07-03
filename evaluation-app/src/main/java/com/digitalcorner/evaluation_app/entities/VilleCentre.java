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
public class VilleCentre {
    @Id
    private Long idVille;

    private String nomCentre;

    private Long codeCentre;

}
