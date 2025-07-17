package com.digitalcorner.evaluation_app.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDate;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class EvaluationsDataResponse {
    private Long idCentre;
    private String nomCentre;
    private String avis;
    private String type;
    private String commentaire;
    private LocalDate date;
}
