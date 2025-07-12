package com.digitalcorner.evaluation_app.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class MonthlyAvis {

    private int total;
    private int satisfaitNb;
    private int tresSatisfaitNb;
    private  int peuSatisfaitNb;
    private  int pasDuToutSatisfaitNb;
}
