package com.digitalcorner.evaluation_app.repositories;

import com.digitalcorner.evaluation_app.entities.VilleCentre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface VilleCentreRepository extends JpaRepository<VilleCentre, Long> {
}
