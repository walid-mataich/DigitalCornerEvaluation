package com.digitalcorner.evaluation_app.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Map;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class CentreResponse {

    private Long villeCentreId;
    private String villeCentreNom;
    private int satisfaitNb;
    private int tresSatisfaitNb;
    private  int peuSatisfaitNb;
    private  int pasDuToutSatisfaitNb;
    private Map<Integer, Map<String, MonthlyAvis>> yearlyMonthly;




}
