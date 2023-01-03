
const apiConfig = {
    apiBaseUrl: "http://localhost:8080/v1"
};

export function ApiService() {
    this.staffLogin = async function (username, pwd) {
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + "/staff/staff-login", {
                body: `username=${username}&pwd=${pwd}`,
                method: 'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };

    this.getDepartments = async function (sessionToken) {///get-staff-departments
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + "/staff/get-staff-departments", {
                method: 'get',
                headers: {
                    token: `Bearer: ${sessionToken}`
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };

    this.getTransactions = async function (sessionToken) {///get-transactions/{upper_limit},{lower_limit}
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + "/transaction/get-transactions/0,200", {
                method: 'get',
                headers: {
                    token: `Bearer: ${sessionToken}`
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.getStaffPrivilege = async function (staffId, sessionToken) {
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + "/staff/get-staff-privilege/"+staffId, {
                method: 'get',
                headers: {
                    "token": `Bearer: ${sessionToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.getStaffList = async function (sessionToken) {//staff/get-staff-list/{upper_limit},{lower_limit}
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + "/staff/get-staff-list/0,200", {
                method: 'get',
                headers: {
                    token: `Bearer: ${sessionToken}`
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.addStaff = async function (staff, sessionToken) {
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + "/staff/add-staff", {
                body: JSON.stringify(staff),
                method: 'post',
                headers: {
                    "token": `Bearer: ${sessionToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.deleteStaff = async function (staffId, sessionToken) {
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + "/staff/delete-staff/"+staffId, {
                method: 'delete',
                headers: {
                    "token": `Bearer: ${sessionToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.getPatientList = async function (sessionToken) {//get-patient-list/{upper_limit},{lower_limit}
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + "/patient/get-patient-list/0,200", {
                method: 'get',
                headers: {
                    "token": `Bearer: ${sessionToken}`
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.getPatient = async function (patientId, sessionToken) {//get-patient/{}
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + `/patient/get-patient/${patientId}`, {
                method: 'get',
                headers: {
                    "token": `Bearer: ${sessionToken}`
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.getPatientByCode = async function (patientCode, sessionToken) {//get-patient/{}
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + `/patient/get-patient-code/${patientCode}`, {
                method: 'get',
                headers: {
                    "token": `Bearer: ${sessionToken}`
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.getStaffByCode = async function (staffCode, sessionToken) {//get-patient/{}
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + `/staff/get-staff-code/${staffCode}`, {
                method: 'get',
                headers: {
                    "token": `Bearer: ${sessionToken}`
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.updateStaff = async function (staff, sessionToken) {
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + "/staff/update-staff", {
                body: JSON.stringify(staff),
                method: 'put',
                headers: {
                    "token": `Bearer: ${sessionToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.addTransaction = async function (transaction, sessionToken) {
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + "/transaction/add-transaction", {
                body: JSON.stringify(transaction),
                method: 'post',
                headers: {
                    "token": `Bearer: ${sessionToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.breakTransaction = async function (transId, sessionToken) {
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + "/transaction/break-staff-transaction/"+transId, {
                method: 'get',
                headers: {
                    "token": `Bearer: ${sessionToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.getTransactionByDate = async function (beginDate, endDate, sessionToken) {
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + "/transaction/staff-transactions-date-range/?" + `date_begin=${beginDate}&date_end=${endDate}`, {
                method: 'get',
                headers: {
                    "token": `Bearer: ${sessionToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.getActivityByAppointmentDate = async function (beginDate, endDate, sessionToken) {
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + "/patient/get-activity-appointment-date/?" + `date_begin=${beginDate}&date_end=${endDate}`, {
                method: 'get',
                headers: {
                    "token": `Bearer: ${sessionToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.deleteDepartment = async function (deptId, sessionToken) {
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + "/staff/delete-staff-department/"+deptId, {
                method: 'delete',
                headers: {
                    "token": `Bearer: ${sessionToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.addDepartment = async function (department, sessionToken) {
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + "/staff/add-staff-department", {
                body: JSON.stringify(department),
                method: 'post',
                headers: {
                    "token": `Bearer: ${sessionToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.addPatient = async function (patient, sessionToken) {
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + "/patient/add-patient", {
                body: JSON.stringify(patient),
                method: 'post',
                headers: {
                    "token": `Bearer: ${sessionToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.updatePatient = async function (patient, sessionToken) {
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + "/patient/update-patient", {
                body: JSON.stringify(patient),
                method: 'put',
                headers: {
                    "token": `Bearer: ${sessionToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.deletePatient = async function (patientId, sessionToken) {
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + "/patient/delete-patient/"+patientId, {
                method: 'delete',
                headers: {
                    "token": `Bearer: ${sessionToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.getPatientActivityList = async function (sessionToken) {
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + `/patient/get-patient-activity/${patientId}/0,200`, {
                method: 'get',
                headers: {
                    "token": `Bearer: ${sessionToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.getPatientActivityCodeList = async function (patientCode, sessionToken) {
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + `/patient/get-patient-activity-code/${patientCode}/0,200`, {
                method: 'get',
                headers: {
                    "token": `Bearer: ${sessionToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.getActivityList = async function (sessionToken) {
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + `/patient/get-patient-activity/0,200`, {
                method: 'get',
                headers: {
                    "token": `Bearer: ${sessionToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
    this.addPatientActivity = async function (activity, sessionToken) {
        try {
            const resp = await fetch(apiConfig.apiBaseUrl + "/patient/add-patient-activity", {
                body: JSON.stringify(activity),
                method: 'post',
                headers: {
                    "token": `Bearer: ${sessionToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            return {response: data, headers: resp.headers, status: resp.status};
        } catch (err) {
            return {serviceError: err};
        }
    };
}