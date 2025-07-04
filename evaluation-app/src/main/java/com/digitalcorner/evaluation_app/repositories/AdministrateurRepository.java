package com.digitalcorner.evaluation_app.repositories;

import com.digitalcorner.evaluation_app.entities.Administrateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministrateurRepository extends JpaRepository<Administrateur, Long> {
}
