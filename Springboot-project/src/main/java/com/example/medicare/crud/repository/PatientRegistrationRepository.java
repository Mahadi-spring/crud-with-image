package com.example.medicare.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.medicare.crud.entity.PatientRegistrationEntity;

public interface PatientRegistrationRepository extends JpaRepository<PatientRegistrationEntity, Integer> {

}
