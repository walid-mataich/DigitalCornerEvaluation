package com.digitalcorner.evaluation_app.entities;



import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
    private Long idEvaluation;

    private LocalDate date;

    private LocalTime Time;

    private String Avis;
}
