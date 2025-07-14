package com.digitalcorner.evaluation_app.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class VilleCentre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCentre;

    private String nomCentre;

    private Long codeCentre;





    @OneToMany(mappedBy = "villeCentre", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Evaluation> evaluations;

    @OneToMany(mappedBy = "villeCentre",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Administrateur> administrateurs;


}
