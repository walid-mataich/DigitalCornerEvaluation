package com.digitalcorner.evaluation_app.repositories;

import com.digitalcorner.evaluation_app.entities.Evaluation;
import com.digitalcorner.evaluation_app.entities.VilleCentre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    List<Evaluation> findByVilleCentre(VilleCentre villeCentre);
}
