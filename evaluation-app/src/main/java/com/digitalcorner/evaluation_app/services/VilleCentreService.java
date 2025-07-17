package com.digitalcorner.evaluation_app.services;


import com.digitalcorner.evaluation_app.dto.CentersResponce;
import com.digitalcorner.evaluation_app.dto.CentreResponse;
import com.digitalcorner.evaluation_app.dto.MonthlyAvis;
import com.digitalcorner.evaluation_app.entities.Evaluation;
import com.digitalcorner.evaluation_app.entities.VilleCentre;
import com.digitalcorner.evaluation_app.repositories.EvaluationRepository;
import com.digitalcorner.evaluation_app.repositories.VilleCentreRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.*;

@Service
public class VilleCentreService {
   final VilleCentreRepository villeCentreRepository;
   final EvaluationRepository evaluationRepository;

    public VilleCentreService(VilleCentreRepository villeCentreRepository, EvaluationRepository evaluationRepository) {
        this.villeCentreRepository = villeCentreRepository;

        this.evaluationRepository = evaluationRepository;
    }


    public List<VilleCentre> getVilleCentres() {
        return villeCentreRepository.findAll();
    }

    public List<CentreResponse> getCentreData(){
        List<CentreResponse> result = new ArrayList<>();
        List<VilleCentre> centres = getVilleCentres();




        for (VilleCentre centre : centres) {
            int pasDuToutSatisfaitNb = 0;
            int peuSatisfaitNb = 0;
            int satisfaitNb = 0;
            int tresSatisfaitNb = 0;
            Map<Integer, Map<String, MonthlyAvis>> yearlyMonthly = new HashMap<>();

            CentreResponse centreResponse = new CentreResponse();
            centreResponse.setVilleCentreId(centre.getIdCentre());
            centreResponse.setVilleCentreNom(centre.getNomCentre());
            centreResponse.setEvaluations(centre.getEvaluations());

            for (Evaluation evaluation : centre.getEvaluations()) {
                LocalDate date = evaluation.getDate();
                int year = date.getYear();
                String month = date.getMonth().getDisplayName(TextStyle.FULL, Locale.FRENCH);
                yearlyMonthly.putIfAbsent(year, new HashMap<>());
                Map<String, MonthlyAvis> monthlyMap = yearlyMonthly.get(year);
                monthlyMap.putIfAbsent(month, new MonthlyAvis());


                MonthlyAvis monthly  = monthlyMap.get(month);
                monthly.setTotal(monthly.getTotal() + 1);
                if (evaluation.getAvis().equals("satisfait")){
                    satisfaitNb++;
                    monthly.setSatisfaitNb(monthly.getSatisfaitNb() + 1);
                }else if (evaluation.getAvis().equals("tres satisfait")){
                    tresSatisfaitNb++;
                    monthly.setTresSatisfaitNb(monthly.getTresSatisfaitNb() + 1);
                }else if (evaluation.getAvis().equals("peu satisfait")){
                    peuSatisfaitNb++;
                    monthly.setPeuSatisfaitNb(monthly.getPeuSatisfaitNb()+ 1);
                }else if (evaluation.getAvis().equals("pas du tout satisfait")){
                    pasDuToutSatisfaitNb++;
                    monthly.setPasDuToutSatisfaitNb(monthly.getPasDuToutSatisfaitNb() + 1);
                }




            }



            centreResponse.setSatisfaitNb(satisfaitNb);
            centreResponse.setTresSatisfaitNb(tresSatisfaitNb);
            centreResponse.setPeuSatisfaitNb(peuSatisfaitNb);
            centreResponse.setPasDuToutSatisfaitNb(pasDuToutSatisfaitNb);
            centreResponse.setYearlyMonthly(yearlyMonthly);



            result.add(centreResponse);
        }


        result.sort((a,b) -> Float.compare((float)(b.getPasDuToutSatisfaitNb()+ b.getPeuSatisfaitNb())/(b.getPasDuToutSatisfaitNb()+b.getPeuSatisfaitNb()+b.getSatisfaitNb()+b.getTresSatisfaitNb()),(float) (a.getPasDuToutSatisfaitNb() + a.getPeuSatisfaitNb())/(a.getPasDuToutSatisfaitNb()+a.getPeuSatisfaitNb()+a.getSatisfaitNb()+a.getTresSatisfaitNb())));
return result;
    }

    public CentersResponce getGeneralCenterData(Long centreId){
        List<Evaluation> allEvaluations = new ArrayList<>() ;
        if (centreId == null){
            allEvaluations = evaluationRepository.findAll();
        } else{
            Optional<VilleCentre> optCentre = villeCentreRepository.findById(centreId);
            if (optCentre.isPresent()){allEvaluations = evaluationRepository.findByVilleCentre(optCentre.get());
            }else {
                return null;
            }
        }

        CentersResponce allCentersResponce = new CentersResponce();
        Map<Integer, Map<String,MonthlyAvis>> totalYearlyMonthlyAvis = new HashMap<>();
        Map<String, Map<Integer, Map<String, MonthlyAvis>>> totalMonthlyAvisByType = new HashMap<>();

        for (Evaluation evaluation : allEvaluations) {
            LocalDate date = evaluation.getDate();
            int year = date.getYear();
            String month = date.getMonth().getDisplayName(TextStyle.FULL, Locale.FRENCH);
            totalYearlyMonthlyAvis.putIfAbsent(year,new HashMap<>());
            Map<String, MonthlyAvis> monthlyMap = totalYearlyMonthlyAvis.get(year);
            monthlyMap.putIfAbsent(month, new MonthlyAvis());

            MonthlyAvis monthly  = monthlyMap.get(month);
            incrementAvis(monthly, evaluation.getAvis());

            String type = evaluation.getType();
            totalMonthlyAvisByType.putIfAbsent(type, new HashMap<>());
            Map<Integer, Map<String, MonthlyAvis>> typeMap = totalMonthlyAvisByType.get(type);
            typeMap.putIfAbsent(year, new HashMap<>());
            Map<String, MonthlyAvis> typeMonthlyMap = typeMap.get(year);
            typeMonthlyMap.putIfAbsent(month, new MonthlyAvis());

            MonthlyAvis monthlyByType = totalMonthlyAvisByType.get(type).get(year).get(month);
            incrementAvis(monthlyByType, evaluation.getAvis());


        }

        allCentersResponce.setGeneralTotalMonthlyAvis(totalYearlyMonthlyAvis);
        allCentersResponce.setTotalMonthlyAvisByType(totalMonthlyAvisByType);


        return allCentersResponce;
    }


    private void incrementAvis(MonthlyAvis monthly, String avis) {
        monthly.setTotal(monthly.getTotal() + 1);

        switch (avis.toLowerCase()) {
            case "satisfait" -> monthly.setSatisfaitNb(monthly.getSatisfaitNb() + 1);
            case "tres satisfait" -> monthly.setTresSatisfaitNb(monthly.getTresSatisfaitNb() + 1);
            case "peu satisfait" -> monthly.setPeuSatisfaitNb(monthly.getPeuSatisfaitNb() + 1);
            case "pas du tout satisfait" -> monthly.setPasDuToutSatisfaitNb(monthly.getPasDuToutSatisfaitNb() + 1);
        }
    }

}
