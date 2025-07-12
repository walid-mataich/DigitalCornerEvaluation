package com.digitalcorner.evaluation_app.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Map;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class AllCentersResponce {
    private int total;
    private Map<Integer, Map<String,MonthlyAvis>> TotalMonthlyAvis;
}

