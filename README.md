## Team Members:
1. Abanenatwe Thierry 28832<br>                                                                                              
2.Hirwa Haguma Hubert 28310<br>                                                                                   
3.Arinatwe Hope 28313<br>
4.Aze Solide 27396<br>
5.Ishema Manzi Bernard 28962<br>                                                                                                 


                                      
## Questin 3: Suspicious Login Monitoring (Advanced Triggers)
Overview: The goal was to monitor user logins and issue an immediate security alert if any user failed to log in more than two times in the same day.

Implementation:

Tables Created: LOGIN_AUDIT (to track all attempts) and SECURITY_ALERTS (to store policy violations).
Solution: A single AFTER INSERT trigger (trg_CheckSuspiciousLogin) was created on the LOGIN_AUDIT table.
<img width="959" height="504" alt="question3 a" src="https://github.com/user-attachments/assets/15071f46-45a2-4f98-a23a-f54713095e1c" />

Logic: The trigger checked if the inserted record's status was 'FAILED'. If so, it performed a COUNT(*) query on LOGIN_AUDIT for the same user on the current day (TRUNC(SYSTIMESTAMP)).
Alerting: If the count was 
≥
3
, the trigger, operating under PRAGMA AUTONOMOUS_TRANSACTION, inserted a new record into SECURITY_ALERTS and executed an independent COMMIT.
Optional: A second trigger was outlined to demonstrate how to use UTL_MAIL to send an external email notification whenever a record was inserted into SECURITY_ALERTS. 
<img width="992" height="895" alt="question3 b" src="https://github.com/user-attachments/assets/db56fc38-a32a-492e-a706-65fb9eb42aac" />
<img width="975" height="695" alt="question3 b1" src="https://github.com/user-attachments/assets/402b419c-34b4-457b-aa92-b44bc2ffccf3" />
## Question 4:Hospital Management (Bulk Processing)
Overview: The requirement was to design a package for efficient patient management, utilizing collections and bulk processing for high-volume data operations.

Implementation:

Tables Created: PATIENTS and DOCTORS.
![question4 a](https://github.com/user-attachments/assets/fd57a505-d4ac-4cf8-a062-2738dc481c98)

Package Created: hospital_mgmt_pkg.
Bulk Collection: A custom patient_tbl collection type was defined (a nested table of a patient_rec record type) to hold multiple patient records in memory.
Procedures/Functions:
bulk_load_patients: Used the FORALL statement to insert all records from the input collection (p_patients_list) into the PATIENTS table with a single context switch, ensuring optimal performance.
admit_patient: Updated the admitted_status for a single patient.
count_admitted: A function to return the total number of admitted patients.
show_all_patients: A function that returns a SYS_REFCURSOR, allowing the calling application to fetch and display the full patient list efficiently.
<img width="918" height="831" alt="question4_b3" src="https://github.com/user-attachments/assets/6be59122-d60b-4a08-bbf1-8e2c031fa1e1" />
<img width="1035" height="885" alt="question4_b1" src="https://github.com/user-attachments/assets/af5b64a8-65cc-4c11-95c6-21db7bf3c898" />
<img width="983" height="915" alt="question4_b2" src="https://github.com/user-attachments/assets/f5eb54fe-fe8a-4205-b329-f99ba915d49a" />




