
import { ApiService } from '../services/apiservice.js';
import exportCsv from '../services/csvExportService.js';
import {
    getDepartmentById,
    getPatientById,
    getStaffById
} from '../services/apiHelperService.js';

const apiService = new ApiService();

export function PatientController($scope, $routeParams, $location, sessionService, $window) {
    $scope.scope = {};
    $scope.scope.siteTitle = "Ademolay Hismercy Hospital";
    $scope.user = sessionService.userObject;
    const funcs = {};

    $scope.genServerResponse = "";
    $scope.newPatientServerResponse = "";
    $scope.$watch('newPatientServerResponse', function () {
        setTimeout(() => {
            $scope.newPatientServerResponse = "";
            $scope.$apply();
        }, 4000);
    }, true);
    $scope.$watch('genServerResponse', function () {
        setTimeout(() => {
            $scope.genServerResponse = "";
            $scope.$apply();
        }, 4000);
    }, true);

    //model to hold current patient item
    $scope.scope.currentPatientDetails = {};//for editing and uploading
    $scope.scope.currentPatientView = {};
    $scope.scope.searchPatientCode = "";
    $scope.scope.currentPatientEdit = {};
    $scope.scope.selected_gender = "m";
    $scope.scope.selected_cardtype = "INDIVIDUAL";
    $scope.viewPatient = function (patient) {
        $scope.scope.selected_gender = patient.patientDetailEntity.gender;
        $scope.scope.currentPatientView = patient;
    };

    //retstore table
    $scope.restoreTable = function () {
        funcs.loadLists();
        //$scope.$apply();
    };

    //search patient
    $scope.showPatientActivity = function () {
        if (!$scope.scope.searchPatientCode || $scope.scope.searchPatientCode.length < 4 || isNaN($scope.scope.searchPatientCode)) {
            $scope.genServerResponse = "Please enter a valid patient code";
            $scope.$apply();
            return;
        }
        apiService.getPatientByCode(Number($scope.scope.searchPatientCode), sessionService.sessionToken)
            .then(pl => {
                if (!pl.response || !pl.response.data) {
                    $scope.genServerResponse = pl.serviceError || pl.response.message;
                    $scope.$apply();
                } else {
                    $scope.scope.patients = [pl.response.data];
                    for (let pat in $scope.scope.patients) {
                        $scope.scope.patients[pat]['staff'] = $scope.findStaffById($scope.scope.patients[pat].staffInChargeId);
                        $scope.scope.patients[pat]['dob'] = new Date($scope.scope.patients[pat].patientDetailEntity.dateOfBirth).toDateString();
                    }
                    $scope.$apply();
                }
            });
    };

    //delete patient //funcs.loadLists();
    $scope.deletePatient = function (patient) {
        if (!confirm(`Are you sure you want to delete patient? [code: ${patient.code}]`)) {
            return;
        }
        apiService.deletePatient(patient.id, sessionService.sessionToken)
            .then(pl => {
                if (!pl.response || pl.serviceError || pl.status > 300) {
                    $scope.genServerResponse = pl.serviceError || pl.response.message;
                    $scope.$apply();
                } else {
                    $scope.scope.currentPatientView = {};
                    $scope.scope.patients = [...$scope.scope.patients.filter(pt => pt.id !== patient.id)];
                    $scope.genServerResponse = "Patient deleted!!";
                    //funcs.loadLists();
                    $scope.$apply();
                }
            });
    };

    //adds new dept
    $scope.addNewPatient = function () {
        const pat = Object.assign({}, $scope.scope.currentPatientDetails);
        if (!pat.dateOfBirth) {
            $scope.newPatientServerResponse = "Please enter the correct Date of Birth"
            $scope.$apply();
            return;
        }
        if (!pat.currentAddress) {
            $scope.newPatientServerResponse = "Please enter Patient's Address"
            $scope.$apply();
            return;
        } if (!pat.doctorInCharge) {
            $scope.newPatientServerResponse = "Please enter Full Name of Doctor in Charge"
            $scope.$apply();
            return;
        }
        pat.dateOfBirth = new Date(pat.dateOfBirth).toISOString();
        pat.gender = $scope.scope.selected_gender;
        pat.height = pat.height * 1.0;
        pat.weight = pat.weight * 1.0;
        //inspect the dates please
        apiService.addPatient({
            staffInChargeId: sessionService.userObject.id,
            patientCardType: $scope.scope.selected_cardtype,
            patientDetailEntity: pat
        }, sessionService.sessionToken)
            .then(pl => {
                if (!pl.response || !pl.response.data) {
                    $scope.newPatientServerResponse = pl.serviceError || pl.response.message;
                    $scope.$apply();
                } else {
                    $scope.newPatientServerResponse = "New Patient added!!";
                    $scope.scope.currentPatientDetails = {};
                    funcs.loadLists();
                    $scope.$apply();
                }
            });

    };
    //edit patient
    $scope.editPatient = function () {
        const pat = Object.assign({}, $scope.scope.currentPatientView.patientDetailEntity);
        if (!pat.currentAddress) {
            $scope.newPatientServerResponse = "Please enter Patient's Address";
            $scope.$apply();
            return;
        } if (!pat.doctorInCharge) {
            $scope.newPatientServerResponse = "Please enter Full Name of Doctor in Charge";
            $scope.$apply();
            return;
        }
        //pat.dateOfBirth = new Date(pat.dateOfBirth).toISOString();
        //pat.height = pat.height * 1.0;
        //pat.weight = pat.weight * 1.0;
        //inspect the dates please
        apiService.updatePatient({
            id: $scope.scope.currentPatientView.id,
            code: $scope.scope.currentPatientView.code,
            staffInChargeId: sessionService.userObject.id,
            joinDateTime: $scope.scope.currentPatientView.joinDateTime,
            patientCardType: $scope.scope.currentPatientView.patientCardType,
            patientDetailEntity: pat
        }, sessionService.sessionToken)
            .then(pl => {
                if (!pl.response || !pl.response.data) {
                    $scope.genServerResponse = pl.serviceError || pl.response.message;
                    $scope.$apply();
                } else {
                    $scope.scope.currentPatientView = {};
                    funcs.loadLists();
                    setTimeout(() => {
                        $scope.genServerResponse = "Patient Detail Edited!!";
                        $scope.$apply();
                    }, 300);
                }
            });

    };

    //doom manipulation
    $scope.dom = {};

    $scope.dom.patientList = true;
    $scope.dom.patientNew = false;

    $scope.hidePatientList = () => {
        $scope.dom.patientList = false;
        $scope.dom.patientNew = true;
    };
    $scope.hidePatientNew = () => {
        $scope.dom.patientList = true;
        $scope.dom.patientNew = false;
    };
    //dom code
    $scope.code = function (num) {
        if (!num) {
            return '';
        }
        num = `${num}`;
        switch (num.length) {
            case 1:
                return '000' + num;
            case 2:
                return '00' + num;
            case 3:
                return '0' + num;
            default:
                return num;
        }
    };

    //exports
    $scope.scope.exportCsv = (tableData)=> {
        const arr = [['Code', 'Patient Name', 'Age', 'Gender', 'Card Type', 'Birth Date']];
        tableData.forEach((objRow)=> {
            arr.push([
                $scope.code(objRow.code), 
                `"${objRow.patientDetailEntity.firstname +' '+objRow.patientDetailEntity.lastname}"`,
                objRow.patientDetailEntity.age,
                objRow.patientDetailEntity.gender,
                objRow.patientCardType,
                objRow.dob
            ]);
        });
        exportCsv(arr);
    };


    //tables operations and service getting
    $scope.scope.patients = [];//patientTemplate();
    $scope.scope.staffList = [];
    $scope.findStaffById = (staffId) => getStaffById(staffId, $scope.scope.staffList);

    funcs.loadLists = function () {
        apiService.getPatientList(sessionService.sessionToken)
            .then((payload) => {
                if (!payload.response || !payload.response.data) {
                    $scope.genServerResponse = payload.serviceError || payload.response.message;
                    $scope.$apply();
                } else {
                    $scope.scope.patients = payload.response.data;
                    $scope.genServerResponse = "";
                    //$scope.$apply();
                    apiService.getStaffList(sessionService.sessionToken)
                        .then(pl => {
                            if (!pl.response || !pl.response.data) {
                                $scope.genServerResponse = pl.serviceError || pl.response.message;
                                $scope.$apply();
                            } else {
                                $scope.scope.staffList = pl.response.data;
                                for (let pat in $scope.scope.patients) {
                                    if ($scope.scope.patients[pat].patientDetailEntity === null) {
                                        continue;
                                    }
                                    $scope.scope.patients[pat]['staff'] = $scope.findStaffById($scope.scope.patients[pat].staffInChargeId);
                                    $scope.scope.patients[pat]['dob'] = new Date($scope.scope.patients[pat].patientDetailEntity.dateOfBirth).toDateString();

                                }
                                $scope.$apply();
                            }
                        });
                }
            });
    };
    funcs.loadLists();

};