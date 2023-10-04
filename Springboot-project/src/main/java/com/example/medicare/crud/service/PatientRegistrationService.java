package com.example.medicare.crud.service;

import java.io.File;
import org.springframework.util.StringUtils;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import javax.persistence.Lob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.medicare.crud.entity.PatientRegistrationEntity;
import com.example.medicare.crud.exception.PatientRegistrationEntityNotFoundException;

import com.example.medicare.crud.repository.PatientRegistrationRepository;

@Service
public class PatientRegistrationService {
	
	@Autowired
	private PatientRegistrationRepository repository;
	
	public List<PatientRegistrationEntity>getPatientList(){
		return repository.findAll();
	}
	
	public PatientRegistrationEntity createpatient(PatientRegistrationEntity patient, MultipartFile image) throws IOException {

          return repository.save(patient);
    }
	
	public void savepatient(PatientRegistrationEntity patient , MultipartFile image) {

         repository.save(patient);
    }
	
	public void savepatient(PatientRegistrationEntity patient) {

        repository.save(patient);
   }
	
	
	
	public PatientRegistrationEntity getPatientById(Integer id) {
        return repository.findById(id).orElse(null);
    }
	
	public void updatePatient(Integer id, PatientRegistrationEntity patient, MultipartFile image) {
	    repository.findById(patient.getId())
	        .map(patientEntity -> {
	            patientEntity.setPatientName(patient.getPatientName());
	            patientEntity.setSalutation(patient.getSalutation());
	            patientEntity.setAge(patient.getAge());
	            patientEntity.setPatientPhone(patient.getPatientPhone());
	            patientEntity.setPatientAddress(patient.getPatientAddress());
	            patientEntity.setGender(patient.getGender());
	            patientEntity.setReligion(patient.getReligion());
	            patientEntity.setDateOfBirth(patient.getDateOfBirth());
	            patientEntity.setMarritalStatus(patient.getMarritalStatus());
	            patientEntity.setFatherName(patient.getFatherName());
	            patientEntity.setMotherName(patient.getMotherName());
	            patientEntity.setPatientPhotoPath(patient.getPatientPhotoPath());
	            return patientEntity;
	        })
	        .ifPresent(repository::save);
	}
	
	public void updatePatient(Integer id, PatientRegistrationEntity patient ) {
	    repository.findById(patient.getId())
	        .map(patientEntity -> {
	            patientEntity.setPatientName(patient.getPatientName());
	            patientEntity.setSalutation(patient.getSalutation());
	            patientEntity.setAge(patient.getAge());
	            patientEntity.setPatientPhone(patient.getPatientPhone());
	            patientEntity.setPatientAddress(patient.getPatientAddress());
	            patientEntity.setGender(patient.getGender());
	            patientEntity.setReligion(patient.getReligion());
	            patientEntity.setDateOfBirth(patient.getDateOfBirth());
	            patientEntity.setMarritalStatus(patient.getMarritalStatus());
	            patientEntity.setFatherName(patient.getFatherName());
	            patientEntity.setMotherName(patient.getMotherName());
	            patientEntity.setPatientPhotoPath(patient.getPatientPhotoPath());
	            return repository.save(patientEntity);
	        })
	        .orElseGet(() -> {
	        	return repository.save(patient);
	        });
	}
	
	
	
	   public void delete(Integer id){
	        repository.deleteById( id);
	    }
	
	


	
	
	
	


}
