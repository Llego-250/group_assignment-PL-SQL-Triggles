# PL/SQL Management System Interface

This web interface demonstrates the functionality of the PL/SQL queries and triggers implemented in Questions 3 and 4.

## Features

### Question 3: Security Monitoring
- **Login Audit System**: Track login attempts (SUCCESS/FAILED)
- **Suspicious Login Detection**: Automatically triggers security alerts after 3+ failed attempts
- **Real-time Alerts**: Visual notifications for security violations
- **Data Tables**: View all login attempts and security alerts

### Question 4: Hospital Management
- **Patient Management**: Add individual patients or bulk load sample data
- **Admission System**: Admit patients and track admission status
- **Statistics**: Real-time count of admitted patients
- **Data Display**: View all patients with their current status

## How to Use

1. Open `index.html` in a web browser
2. Use the tabs to switch between Security Monitoring and Hospital Management
3. Test the functionality:
   - **Security Tab**: Add login attempts and observe automatic alert generation
   - **Hospital Tab**: Add patients, admit them, and view statistics

## Simulated PL/SQL Operations

### Security Triggers
- Simulates the `trg_CheckSuspiciousLogin` trigger
- Automatically creates security alerts when failed login threshold is reached
- Demonstrates autonomous transaction behavior

### Hospital Package Functions
- `bulk_load_patients`: Simulated bulk insert operations
- `admit_patient`: Update patient admission status
- `count_admitted`: Count admitted patients
- `show_all_patients`: Display all patient records

## Screenshots

### Question 3: Security Monitoring Implementation
![Question 3 Schema](screenshots/question3%20a.png)
![Question 3 Trigger Implementation](screenshots/question3_a1.png)
![Question 3 Testing](screenshots/question3_a2.png)

### Question 4: Hospital Management Implementation
![Question 4 Schema](screenshots/question4%20a.jpg)
![Question 4 Package Specification](screenshots/question4_a.png)
![Question 4 Package Body 1](screenshots/question4_b1.png)
![Question 4 Package Body 2](screenshots/question4_b2.png)

### Interface Screenshots
![Security Monitoring Interface](screenshots/Interface/Question3.png)
![Hospital Management Interface](screenshots/Interface/Question4.png)

## Files Structure
```
interface/
├── index.html      # Main interface
├── styles.css      # Styling and layout
├── script.js       # JavaScript functionality
├── screenshots/    # Implementation screenshots
└── README.md       # This documentation
```

## Team Members
1. Abanenatwe Thierry 28832
2. Hirwa Haguma Hubert 28310
3. Arinatwe Hope 28313
4. Aze Solide 27396
5. Ishema Manzi Bernard 28962