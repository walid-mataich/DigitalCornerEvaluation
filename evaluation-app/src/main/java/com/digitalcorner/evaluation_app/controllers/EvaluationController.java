package com.digitalcorner.evaluation_app.controllers;


import com.digitalcorner.evaluation_app.dto.EvaluationsDataResponse;
import com.digitalcorner.evaluation_app.entities.Evaluation;
import com.digitalcorner.evaluation_app.services.EvaluationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "*")
@RestController
public class EvaluationController {
    final EvaluationService evaluationService;

    public EvaluationController(EvaluationService evaluationService) {
        this.evaluationService = evaluationService;
    }


    @PostMapping("/adminsuperadmin/evaluations/add")
    public void addEvaluation(@RequestParam Long idCentre, @RequestParam String avis, @RequestParam String type, @RequestParam String comment) {
        evaluationService.addEvaluation(avis, idCentre, type, comment);
    }


    @DeleteMapping("/superadmin/evaluations/deleteById")
    void deleteEvaluation(@RequestParam Long idEvaluation) {
        evaluationService.deleteEvaluation(idEvaluation);
    }



    @DeleteMapping("/adminsuperadmin/evaluations/deleteByCenter")
    void deleleByCente(@RequestParam Long idCenter) {
        evaluationService.deleteEvaluationsByCenter(idCenter);
    }



    @GetMapping("/superadmin/evaluations")
    public List<Evaluation> getEvaluations() {
        return evaluationService.getEvaluations();
    }

    @GetMapping("/superadmin/evaluationswithcomments")
    public List<EvaluationsDataResponse> getEvaluationsWithComments() {
        return evaluationService.getEvaluationsHavingComment();
    }

}
