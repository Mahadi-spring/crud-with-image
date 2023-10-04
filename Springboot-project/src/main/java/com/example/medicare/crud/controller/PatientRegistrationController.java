package com.example.medicare.crud.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import com.example.medicare.crud.entity.PatientRegistrationEntity;
import com.example.medicare.crud.service.PatientRegistrationService;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.util.StringUtils;

@RestController
@RequestMapping("/patient/")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")

public class PatientRegistrationController {
	@Autowired
	PatientRegistrationService registrationService;

	private transient String photoName;
	
	//create a folder to save images
	   static String path = "F:\\patientPhoto\\"; 
	
		
 private String imagePath;
	

	

	
	@DeleteMapping("post/{id}")
    public void delete (@PathVariable("id") Integer id){
		registrationService.delete(id);
    }
	
	
	
	// edit 
	 @GetMapping("/post/{id}")
	   
	    public PatientRegistrationEntity findPatientById(@PathVariable Integer id) {
	       return registrationService.getPatientById(id); 
	    }
	 
	 
	 
	 //update
	 @PutMapping ("update-with-image/{id}")
	 public void update(@PathVariable("id") Integer id, @RequestParam("reqobj") String reqobj, 
			 @RequestParam(value="file", required = false) MultipartFile file){
		 
		 try {
		    	
		    	String fullPath = null;  // by default it should be null
		    	 
		    	if(file !=null){
		    		
					fullPath =  path+file.getOriginalFilename(); //path+ file name
					file.transferTo(new File(fullPath)); //save to pc hdd
		        }
					
		    	//This line uses the objectMapperReadValue() method to deserialize the JSON string 
		    	//in the reqobj parameter into a PatientRegistrationEntity object.
		    	PatientRegistrationEntity patient = objectMapperReadValue(reqobj,PatientRegistrationEntity.class);

					patient.setPatientPhotoPath(fullPath); //save path name to database
					
				    registrationService.updatePatient(id, patient);
		
				
			} catch (IllegalStateException e) {
				 
				e.printStackTrace();
			} catch (IOException e) {
				 
				e.printStackTrace();
			}

		 
	    }
	
	 
	
	
	 
	 
		@GetMapping("patient-table")
	    List<PatientRegistrationEntity> patientList(){
			
			
			for (PatientRegistrationEntity patient : registrationService.getPatientList()) {
				
				if(patient.getPatientPhotoPath() !=null) {
					patient.setPhotoName(this.encode(patient.getPatientPhotoPath()));	
				}
				
		 
			}
	        return registrationService.getPatientList();
	    }
		
		 // Encoder
		public  String encode(String imagePath)  {
			byte[] data = null;
			try {
				data = Files.readAllBytes(Paths.get(imagePath));
			} catch (IOException e) {
				
				e.printStackTrace();
			}
			return Base64.getEncoder().encodeToString(data);
		}
		
		// Decoder
		
		public static byte[] decode(String base64Image) {
			return Base64.getDecoder().decode(base64Image);
		}
		
		
		
		
		@PostMapping("create-with-image")

//		The method first checks if the file parameter is null. If it is not null, the method saves the file to the path directory
//		on the server's hard drive. The method then uses the objectMapperReadValue() method to deserialize 
//		the JSON string in the reqobj parameter into a PatientRegistrationEntity object.
		
		 public void createPatient(@RequestParam("reqobj") String reqobj, @RequestParam(value="file", required = false) MultipartFile file)  {
			

			// now the string pojo class will be a JSON string representing the patient registration data. so we need to create a method. 

			    try {
			    	
			    	String fullPath = null;  // by default it should be null
			    	 
			    	if(file !=null){
			    		
						fullPath =  path+file.getOriginalFilename(); //path+ file name
						file.transferTo(new File(fullPath)); //save to pc hdd
			        }
						
			    	//This line uses the objectMapperReadValue() method to deserialize the JSON string 
			    	//in the reqobj parameter into a PatientRegistrationEntity object.
			    	PatientRegistrationEntity patient = objectMapperReadValue(reqobj,PatientRegistrationEntity.class);

						patient.setPatientPhotoPath(fullPath); //save path name to database
						
					    registrationService.savepatient(patient);
			
					
				} catch (IllegalStateException e) {
					 
					e.printStackTrace();
				} catch (IOException e) {
					 
					e.printStackTrace();
				}
		

	       
	   } 
	 
	 
	// JSON is a format that encodes objects in a string. 
	//Serialization means to convert an object into that string, and deserialization is its inverse operation (convert string -> object).
	 
	// json mapping method. takes string entity class variable name, original entity class name.class 
	// The T type parameter represents the type of the object that will be deserialized from the JSON content.
	 private <T> T objectMapperReadValue(String content, Class<T> valueType) {
		   
	 // The ObjectMapper class is used to serialize and deserialize JSON content.
		    ObjectMapper objectMapper = new ObjectMapper();

		
		    
//		This block of code tries to deserialize the JSON content into an object of the specified type. 
//		If the deserialization is successful, the method returns the deserialized object. 
//		Otherwise, the method catches any exceptions that occur and returns null.
		    
		try {

		// This line configures the ObjectMapper to ignore unknown properties. 
		//This is necessary because the JSON content may contain properties that are not defined in the target object type.
			
			return objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false).readValue(content,valueType);

		} catch (JsonParseException e) {
			
			e.printStackTrace();
			return null;
		} catch (JsonMappingException e) {
			
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			
			e.printStackTrace();
			return null;
		}
		
	}
}
