package com.example.medicare.crud.entity;


import java.beans.Transient;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@ToString
@Table (name = "patient_registration")
public class PatientRegistrationEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private String patientName; 
	private String salutation; 
	private String age;
	private String patientPhone; 
	private String patientAddress; 
	private String gender;
	private String religion;
	private String dateOfBirth; 
	private String marritalStatus; 
	private String fatherName; 
	private String motherName;
	private String patientPhotoPath;
	
	@javax.persistence.Transient
	private String photoName;
	
	@Lob
	private String patientImage;


	


}
