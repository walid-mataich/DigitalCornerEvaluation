package com.digitalcorner.evaluation_app.services;


import com.digitalcorner.evaluation_app.dto.AllCentersResponce;
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

            CentreResponse centreRequest = new CentreResponse();
            centreRequest.setVilleCentreId(centre.getIdCentre());
            centreRequest.setVilleCentreNom(centre.getNomCentre());

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



            centreRequest.setSatisfaitNb(satisfaitNb);
            centreRequest.setTresSatisfaitNb(tresSatisfaitNb);
            centreRequest.setPeuSatisfaitNb(peuSatisfaitNb);
            centreRequest.setPasDuToutSatisfaitNb(pasDuToutSatisfaitNb);
            centreRequest.setYearlyMonthly(yearlyMonthly);



            result.add(centreRequest);
        }


        result.sort((a,b) -> Float.compare((float)b.getPasDuToutSatisfaitNb()/(b.getPasDuToutSatisfaitNb()+b.getPeuSatisfaitNb()+b.getSatisfaitNb()+b.getTresSatisfaitNb()),(float) a.getPasDuToutSatisfaitNb()/(a.getPasDuToutSatisfaitNb()+a.getPeuSatisfaitNb()+a.getSatisfaitNb()+a.getTresSatisfaitNb())));
return result;
    }

    public AllCentersResponce getGeneralCenterData(){
        List<Evaluation> allEvaluations = evaluationRepository.findAll();
        AllCentersResponce allCentersResponce = new AllCentersResponce();
        Map<Integer, Map<String,MonthlyAvis>> totalYearlyMonthlyAvis = new HashMap<>();

        for (Evaluation evaluation : allEvaluations) {
            LocalDate date = evaluation.getDate();
            int year = date.getYear();
            String month = date.getMonth().getDisplayName(TextStyle.FULL, Locale.FRENCH);
            totalYearlyMonthlyAvis.putIfAbsent(year,new HashMap<>());
            Map<String, MonthlyAvis> monthlyMap = totalYearlyMonthlyAvis.get(year);
            monthlyMap.putIfAbsent(month, new MonthlyAvis());

            MonthlyAvis monthly  = monthlyMap.get(month);
            monthly.setTotal(monthly.getTotal() + 1);
            if (evaluation.getAvis().equals("satisfait")){

                monthly.setSatisfaitNb(monthly.getSatisfaitNb() + 1);
            }else if (evaluation.getAvis().equals("tres satisfait")){

                monthly.setTresSatisfaitNb(monthly.getTresSatisfaitNb() + 1);
            }else if (evaluation.getAvis().equals("peu satisfait")){

                monthly.setPeuSatisfaitNb(monthly.getPeuSatisfaitNb()+ 1);
            }else if (evaluation.getAvis().equals("pas du tout satisfait")){

                monthly.setPasDuToutSatisfaitNb(monthly.getPasDuToutSatisfaitNb() + 1);
            }

            allCentersResponce.setTotalMonthlyAvis(totalYearlyMonthlyAvis);


        }


        return allCentersResponce;
    }
}
