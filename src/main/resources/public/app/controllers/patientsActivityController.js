
import { ApiService } from '../services/apiservice.js';
import exportCsv from '../services/csvExportService.js';
import {
    getDepartmentById,
    getPatientById,
    getStaffById
} from '../services/apiHelperService.js';

const apiService = new ApiService();

export function PatientActivityController($scope, $routeParams, $location, sessionService, $window) {
    $scope.scope = {};
    $scope.scope.siteTitle = "Ademolay Hismercy Hospital";
    $scope.user = sessionService.userObject;
    const funcs = {};

    $scope.genServerResponse = "";
    $scope.newActivityServerResponse = "";
    $scope.$watch('newActivityServerResponse', function () {
        setTimeout(() => {
            $scope.newActivityServerResponse = "";
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
    $scope.scope.currentActivityDetails = {};//for editing and uploading
    $scope.scope.currentActivityView = {};
    $scope.scope.searchPatientCode = "";
    $scope.scope.activityTypes = [
        { v: 'returning', l: 'Returning Patient' },
        { v: 'admitted', l: 'Admitted Patient' },
        { v: 'discharged', l: 'Discharged Patient' }
    ];
    $scope.scope.selected_activity_type = "returning";
    $scope.viewActivity = function (activity) {
        $scope.scope.currentActivityView = activity;
    };
    $scope.showPatientActivity = function () {
        if (!$scope.scope.searchPatientCode || $scope.scope.searchPatientCode.length < 4 || isNaN($scope.scope.searchPatientCode)) {
            $scope.genServerResponse = "Please enter a valid patient code";
            $scope.$apply();
            return;
        }
        apiService.getPatientActivityCodeList(Number($scope.scope.searchPatientCode), sessionService.sessionToken)
            .then(pl => {
                if (!pl.response || !pl.response.data) {
                    $scope.genServerResponse = pl.serviceError || pl.response.message;
                    $scope.$apply();
                } else {
                    $scope.scope.activities = pl.response.data;
                    for (let act in $scope.scope.activities) {
                        $scope.scope.activities[act]['patient'] = $scope.findPatientById($scope.scope.activities[act].patientId);
                        $scope.scope.activities[act]['staff'] = $scope.findStaffById($scope.scope.activities[act].staffId);
                        $scope.scope.activities[act]['date'] = new Date($scope.scope.activities[act].dateTime).toGMTString().replace("GMT", "");
                        $scope.scope.activities[act]['nextAppointDate'] = new Date($scope.scope.activities[act].nextAppointmentDateTime).toGMTString().replace("GMT", "");
                    }
                    $scope.$apply();
                }
            });
    };
    //show transaction by date
    $scope.showAppointmentDateList = function () {
        if (!$scope.scope.searchAppointDate) {
            $scope.genServerResponse = "Please enter a valid date";
            $scope.$apply();
            return;
        }
        const dateObj = new Date($scope.scope.searchAppointDate);
        const dateExtract = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
        const endDate = new Date(dateExtract + ' 23:59').toISOString();
        const beginDate = new Date(dateExtract + ' 1:00').toISOString();
        apiService.getActivityByAppointmentDate(beginDate, endDate, sessionService.sessionToken)
            .then(pl => {
                if (!pl.response || !pl.response.data) {
                    $scope.genServerResponse = pl.serviceError || pl.response.message;
                } else {
                    $scope.scope.activities = pl.response.data;
                    for (let act in $scope.scope.activities) {
                        $scope.scope.activities[act]['patient'] = $scope.findPatientById($scope.scope.activities[act].patientId);
                        $scope.scope.activities[act]['staff'] = $scope.findStaffById($scope.scope.activities[act].staffId);
                        $scope.scope.activities[act]['date'] = new Date($scope.scope.activities[act].dateTime).toGMTString().replace("GMT", "");
                        $scope.scope.activities[act]['nextAppointDate'] = new Date($scope.scope.activities[act].nextAppointmentDateTime).toGMTString().replace("GMT", "");
                    }
                }
                $scope.$apply();
            });
    };
    //retstore table
    $scope.restoreTable = function () {
        funcs.loadLists();
        //$scope.$apply();
    };

    $scope.showDate = function(dateStr){
        return (!dateStr || dateStr.indexOf('1970') != -1) ? 'NA' : dateStr;
    };

    //adds new dept
    $scope.addNewActivity = function () {
        const pat = {};
        if (!$scope.scope.currentActivityDetails.nextAppointmentDate || !$scope.scope.currentActivityDetails.nextAppointmentTime) {
            $scope.newActivityServerResponse = "Please enter the correct Date & Time of Next Appointment"
            $scope.$apply();
            return;
        }
        const dateObj = new Date($scope.scope.currentActivityDetails.nextAppointmentDate);
        const dateExtract = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
        const timeObj = new Date($scope.scope.currentActivityDetails.nextAppointmentTime);
        const timeExtract = `${timeObj.getHours()}:${timeObj.getMinutes()}`;
        console.log(dateExtract +' '+timeExtract);
        pat.nextAppointmentDateTime = new Date(dateExtract +' '+timeExtract).toISOString();
            
        pat.patientId = $scope.scope.currentActivityView.patient.id;
        pat.staffId = sessionService.userObject.id;
        pat.remarks = $scope.scope.currentActivityDetails.remarks;
        pat.activityType = $scope.scope.activityTypes.find(acti => acti.v === $scope.scope.selected_activity_type).l;
        apiService.addPatientActivity(pat, sessionService.sessionToken)
            .then(pl => {
                if (!pl.response || !pl.response.data) {
                    $scope.newActivityServerResponse = pl.serviceError || pl.response.message;
                    $scope.$apply();
                } else {
                    $scope.newActivityServerResponse = "New Patient Activity added!!";
                    $scope.scope.currentActivityDetails = {};
                    funcs.loadLists();
                    $scope.$apply();
                }
            });
    };
    //load patient with code
    //$scope.scope.currentActivityDetails.patientCode = "";
    $scope.findPatientByCode = function () {
        if ($scope.scope.currentActivityDetails.patientCode.length < 4) {
            $scope.newActivityServerResponse = "Patient Code is expected to be minimum 4 characters long";
            return;
        }
        apiService.getPatientByCode($scope.scope.currentActivityDetails.patientCode, sessionService.sessionToken)
            .then(pl => {
                if (!pl.response || !pl.response.data) {
                    $scope.newActivityServerResponse = pl.serviceError || pl.response.message;
                    $scope.$apply();
                } else {
                    $scope.scope.currentActivityView.patient = pl.response.data;
                    $scope.$apply();
                }
            });
    };

    //doom manipulation
    $scope.dom = {};

    $scope.dom.activityList = true;
    $scope.dom.activityNew = false;

    $scope.hideActivityList = () => {
        $scope.dom.activityList = false;
        $scope.dom.activityNew = true;
    };
    $scope.hideActivityNew = () => {
        $scope.dom.activityList = true;
        $scope.dom.activityNew = false;
    };
    //dom code
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
        const arr = [['Date Time', 'Patient Code', 'Activity Description', 'Staff in Charge', 'Next Appointment']];
        tableData.forEach((objRow)=> {
            arr.push([
                `"${objRow.date}"`,
                $scope.code(objRow.patient.code), 
                objRow.activityType,
                objRow.staff.username,
                $scope.showDate(objRow.nextAppointDate)
            ]);
        });
        exportCsv(arr);
    };


    //tables operations and service getting
    $scope.scope.activities = [];//activityTemplate();
    $scope.scope.patientList = [];
    $scope.scope.staffList = [];
    $scope.findPatientById = (patientId) => getPatientById(patientId, $scope.scope.patientList);
    $scope.findStaffById = (staffId) => getStaffById(staffId, $scope.scope.staffList);

    funcs.loadLists = function () {
        apiService.getActivityList(sessionService.sessionToken)
            .then((payload) => {
                if (!payload.response || !payload.response.data) {
                    $scope.genServerResponse = payload.serviceError || payload.response.message;
                    $scope.$apply();
                } else {
                    $scope.scope.activities = payload.response.data;
                    $scope.genServerResponse = "";
                    //$scope.$apply();
                    apiService.getStaffList(sessionService.sessionToken)
                        .then(pl => {
                            if (!pl.response || !pl.response.data) {
                                $scope.genServerResponse = pl.serviceError || pl.response.message;
                                $scope.$apply();
                            } else {
                                $scope.scope.staffList = pl.response.data;
                            }
                        });
                    apiService.getPatientList(sessionService.sessionToken)
                        .then(pl => {
                            if (!pl.response || !pl.response.data) {
                                $scope.genServerResponse = pl.serviceError || pl.response.message;
                                $scope.$apply();
                            } else {
                                $scope.scope.patientList = pl.response.data;
                                for (let act in $scope.scope.activities) {
                                    $scope.scope.activities[act]['patient'] = $scope.findPatientById($scope.scope.activities[act].patientId);
                                    $scope.scope.activities[act]['staff'] = $scope.findStaffById($scope.scope.activities[act].staffId);
                                    $scope.scope.activities[act]['date'] = new Date($scope.scope.activities[act].dateTime).toGMTString().replace("GMT", "");
                                    $scope.scope.activities[act]['nextAppointDate'] = new Date($scope.scope.activities[act].nextAppointmentDateTime).toGMTString().replace("GMT", "");
                                }
                                $scope.$apply();
                            }
                        });
                }
            });
    };
    funcs.loadLists();

};