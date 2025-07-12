package com.digitalcorner.evaluation_app.entities;



import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEvaluation;

    private LocalDate date = LocalDate.now();

    private LocalTime Time = LocalTime.now();


    private String Avis;



    @ManyToOne
    @JsonBackReference
    @JoinColumn(name ="id_centre",nullable = false )
    private VilleCentre villeCentre;


}
