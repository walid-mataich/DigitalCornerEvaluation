package com.digitalcorner.evaluation_app.services;


import com.digitalcorner.evaluation_app.dto.EvaluationsDataResponse;
import com.digitalcorner.evaluation_app.entities.Evaluation;
import com.digitalcorner.evaluation_app.entities.VilleCentre;
import com.digitalcorner.evaluation_app.repositories.EvaluationRepository;
import com.digitalcorner.evaluation_app.repositories.VilleCentreRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EvaluationService {

    final EvaluationRepository evaluationRepository;
    final VilleCentreRepository villeCentreRepository;

    public EvaluationService(EvaluationRepository evaluationRepository, VilleCentreRepository villeCentreRepository) {
        this.evaluationRepository = evaluationRepository;
        this.villeCentreRepository = villeCentreRepository;
    }

    public void addEvaluation(String Avis,Long idCentre, String type, String comment){
        Evaluation newEvaluation = new Evaluation();
        Optional<VilleCentre> optionalVilleCentre = villeCentreRepository.findById(idCentre);

        if(optionalVilleCentre.isPresent()){
            VilleCentre villeCentre = optionalVilleCentre.get();
            newEvaluation.setAvis(Avis);
            newEvaluation.setType(type);
            newEvaluation.setComment(comment);
            newEvaluation.setVilleCentre(villeCentre);
            evaluationRepository.save(newEvaluation);
            System.out.println("evaluation enregistre avec succes");
        }

    }

    public void deleteEvaluation(Long idEvaluation){
        Optional<Evaluation> optionalEvaluation = evaluationRepository.findById(idEvaluation);
        if(optionalEvaluation.isPresent()){
            evaluationRepository.deleteById(idEvaluation);
            System.out.println("evaluation supprimme avec succes");
        }
    }

    public void deleteEvaluationsByCenter(Long idCentre){
        Optional<VilleCentre> optCentre = villeCentreRepository.findById(idCentre);
        if(optCentre.isPresent()){
            List<Evaluation> evaluationsToDelete = evaluationRepository.findByVilleCentre(optCentre.get()) ;
            for(Evaluation evaluation : evaluationsToDelete){
                evaluationRepository.delete(evaluation);
            }
            System.out.println("evaluations supprimes avec succes");
        }

    }


    public List<Evaluation> getEvaluations(){
        return evaluationRepository.findAll();
    }

    public List<EvaluationsDataResponse> getEvaluationsHavingComment(){
        List<Evaluation> evaluations = getEvaluations();

        List<EvaluationsDataResponse> result = new ArrayList<>();
        for (Evaluation evaluation : evaluations) {
            if(evaluation.getComment() != null){
                EvaluationsDataResponse evaluationsDataResponse = new EvaluationsDataResponse();
                evaluationsDataResponse.setNomCentre(evaluation.getVilleCentre().getNomCentre());
                evaluationsDataResponse.setDate(evaluation.getDate());
                evaluationsDataResponse.setCommentaire(evaluation.getComment());
                evaluationsDataResponse.setType(evaluation.getType());
                if(evaluation.getAvis().equals("tres satisfait")){
                    evaluationsDataResponse.setAvis("trés satisfait");
                }else {
                    evaluationsDataResponse.setAvis(evaluation.getAvis());
                }
                evaluationsDataResponse.setIdCentre(evaluation.getVilleCentre().getIdCentre());
                result.add(evaluationsDataResponse);

            }
        }

        return result;

    }



}
