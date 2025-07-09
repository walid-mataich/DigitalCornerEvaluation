package com.digitalcorner.evaluation_app.controllers;


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

//    api to add evaluations : st3mlo hakka : expl: http://localhost:8080/api/evaluations/add?idCentre=1&avis="tres satisfais"
    @PostMapping("/superadmin/evaluations/add")
    public void addEvaluation(@RequestParam Long idCentre, @RequestParam String avis) {
        evaluationService.addEvaluation(avis, idCentre);
    }

    // api to delete evaluation
    @DeleteMapping("/superadmin/evaluations/deleteById")
    void deleteEvaluation(@RequestParam Long idEvaluation) {
        evaluationService.deleteEvaluation(idEvaluation);
    }


    //api to delete all evaluations dyal centre wa7d
    @DeleteMapping("/adminsuperadmin/evaluations/deleteByCenter")
    void deleleByCente(@RequestParam Long idCenter) {
        evaluationService.deleteEvaluationsByCenter(idCenter);
    }



    @GetMapping("/superadmin/evaluations")
    public List<Evaluation> getEvaluations() {
        return evaluationService.getEvaluations();
    }

}
