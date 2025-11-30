// Data storage (simulating database)
let loginAuditData = [];
let securityAlertsData = [];
let patientsData = [];
let auditIdCounter = 1;
let alertIdCounter = 1;

// Tab functionality
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Security Monitoring Functions
function addLoginAttempt() {
    const username = document.getElementById('username').value;
    const status = document.getElementById('loginStatus').value;
    const ipAddress = document.getElementById('ipAddress').value || '192.168.1.100';
    
    if (!username) {
        alert('Please enter a username');
        return;
    }
    
    const loginAttempt = {
        auditId: auditIdCounter++,
        username: username,
        attemptTime: new Date().toLocaleString(),
        status: status,
        ipAddress: ipAddress
    };
    
    loginAuditData.push(loginAttempt);
    
    // Check for suspicious activity (3+ failed attempts in same day)
    if (status === 'FAILED') {
        checkSuspiciousLogin(username);
    }
    
    updateLoginAuditTable();
    clearSecurityForm();
    showAlert('Login attempt recorded successfully!', 'success');
}

function checkSuspiciousLogin(username) {
    const today = new Date().toDateString();
    const failedAttempts = loginAuditData.filter(attempt => 
        attempt.username === username && 
        attempt.status === 'FAILED' && 
        new Date(attempt.attemptTime).toDateString() === today
    );
    
    if (failedAttempts.length >= 3) {
        const alert = {
            alertId: alertIdCounter++,
            username: username,
            failedAttemptsCount: failedAttempts.length,
            alertTime: new Date().toLocaleString(),
            alertMessage: `SECURITY ALERT: User ${username} has ${failedAttempts.length} failed login attempts today`
        };
        
        securityAlertsData.push(alert);
        updateSecurityAlertsTable();
        showAlert(`SECURITY ALERT: Suspicious activity detected for user ${username}!`, 'danger');
    }
}

function updateLoginAuditTable() {
    const tbody = document.querySelector('#loginAuditTable tbody');
    tbody.innerHTML = '';
    
    loginAuditData.forEach(record => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${record.auditId}</td>
            <td>${record.username}</td>
            <td>${record.attemptTime}</td>
            <td><span class="status-${record.status.toLowerCase()}">${record.status}</span></td>
            <td>${record.ipAddress}</td>
        `;
    });
}

function updateSecurityAlertsTable() {
    const tbody = document.querySelector('#securityAlertsTable tbody');
    tbody.innerHTML = '';
    
    securityAlertsData.forEach(alert => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${alert.alertId}</td>
            <td>${alert.username}</td>
            <td>${alert.failedAttemptsCount}</td>
            <td>${alert.alertTime}</td>
            <td>${alert.alertMessage}</td>
        `;
    });
}

// Hospital Management Functions
function addPatient() {
    const patientId = document.getElementById('patientId').value;
    const name = document.getElementById('patientName').value;
    const age = document.getElementById('patientAge').value;
    const gender = document.getElementById('patientGender').value;
    
    if (!patientId || !name || !age) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (patientsData.find(p => p.patientId == patientId)) {
        alert('Patient ID already exists');
        return;
    }
    
    const patient = {
        patientId: parseInt(patientId),
        name: name,
        age: parseInt(age),
        gender: gender,
        admittedStatus: 'N'
    };
    
    patientsData.push(patient);
    updatePatientsTable();
    clearHospitalForm();
    showAlert('Patient added successfully!', 'success');
}

function bulkLoadPatients() {
    const samplePatients = [
        { patientId: 27396, name: 'AZE Solide', age: 25, gender: 'Male', admittedStatus: 'N' },
        { patientId: 28832, name: 'Abanenatwe Thierry', age: 62, gender: 'Male', admittedStatus: 'N' },
        { patientId: 28313, name: 'Arinatwe Hope', age: 28, gender: 'Female', admittedStatus: 'N' },
        { patientId: 28962, name: 'Ishema Manzi Bernard', age: 28, gender: 'Male', admittedStatus: 'N' },
        { patientId: 28310, name: 'Hirwa Haguma Hubert', age: 30, gender: 'Male', admittedStatus: 'N' }
    ];
    
    samplePatients.forEach(patient => {
        if (!patientsData.find(p => p.patientId === patient.patientId)) {
            patientsData.push(patient);
        }
    });
    
    updatePatientsTable();
    showAlert(`Bulk loaded ${samplePatients.length} patients successfully!`, 'success');
}

function admitPatient() {
    const patientId = document.getElementById('admitPatientId').value;
    
    if (!patientId) {
        alert('Please enter a Patient ID');
        return;
    }
    
    const patient = patientsData.find(p => p.patientId == patientId);
    
    if (!patient) {
        alert('Patient not found');
        return;
    }
    
    if (patient.admittedStatus === 'Y') {
        alert('Patient is already admitted');
        return;
    }
    
    patient.admittedStatus = 'Y';
    updatePatientsTable();
    updateAdmittedCount();
    document.getElementById('admitPatientId').value = '';
    showAlert(`Patient ${patient.name} admitted successfully!`, 'success');
}

function showAdmittedCount() {
    updateAdmittedCount();
    const count = patientsData.filter(p => p.admittedStatus === 'Y').length;
    showAlert(`Total admitted patients: ${count}`, 'success');
}

function updatePatientsTable() {
    const tbody = document.querySelector('#patientsTable tbody');
    tbody.innerHTML = '';
    
    patientsData.forEach(patient => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${patient.patientId}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td><span class="status-${patient.admittedStatus.toLowerCase()}">${patient.admittedStatus === 'Y' ? 'Admitted' : 'Not Admitted'}</span></td>
        `;
    });
}

function updateAdmittedCount() {
    const count = patientsData.filter(p => p.admittedStatus === 'Y').length;
    document.getElementById('admittedCount').textContent = count;
}

// Utility Functions
function clearSecurityForm() {
    document.getElementById('username').value = '';
    document.getElementById('ipAddress').value = '';
}

function clearHospitalForm() {
    document.getElementById('patientId').value = '';
    document.getElementById('patientName').value = '';
    document.getElementById('patientAge').value = '';
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.tab-content.active .section');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Initialize the interface
document.addEventListener('DOMContentLoaded', function() {
    updateLoginAuditTable();
    updateSecurityAlertsTable();
    updatePatientsTable();
    updateAdmittedCount();
    
    // Add some sample data for demonstration
    setTimeout(() => {
        // Sample login attempts
        document.getElementById('username').value = 'Solide AZE';
        document.getElementById('loginStatus').value = 'SUCCESS';
        addLoginAttempt();
        
        document.getElementById('username').value = 'Abanenatwe Thierry';
        document.getElementById('loginStatus').value = 'FAILED';
        addLoginAttempt();
        
        document.getElementById('username').value = 'Arinatwe Hope-Admin';
        document.getElementById('loginStatus').value = 'SUCCESS';
        addLoginAttempt();
    }, 500);
});