
import { ApiService } from '../services/apiservice.js';
import {
    getDepartmentById,
    getPatientById,
    getStaffById
} from '../services/apiHelperService.js';
import { patientTemplate } from '../templates/jsonDumps.js';

const apiService = new ApiService();

export function StaffController($scope, $routeParams, $location, sessionService, $window) {
    $scope.scope = {};
    $scope.scope.siteTitle = "Ademolay Hismercy Hospital";
    $scope.user = sessionService.userObject;
    const funcs = {};

    $scope.genServerResponse = "";
    $scope.newStaffServerResponse = "";
    $scope.$watch('newStaffServerResponse', function () {
        setTimeout(() => {
            $scope.newStaffServerResponse = "";
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
    $scope.scope.currentStaffDetails = {};//for editing and uploading
    $scope.scope.currentStaffView = {};
    $scope.scope.selected_dept = "-";
    $scope.scope.selected_privilege = "-";
    $scope.scope.privilege = [ //switch to loading from db not hardcoded
        { id: '1', l: 'Manager' }, { id: '2', l: 'Admin' }
    ];
    $scope.viewStaff = function (staff) {
        $scope.scope.currentStaffView = staff;
    };

    //delete patient //funcs.loadLists();
    $scope.deleteStaff = function (staff) {
        if (!confirm(`Are you sure you want to delete staff  ${staff.username}? `)) {
            return;
        }
        apiService.deleteStaff(staff.id, sessionService.sessionToken)
            .then(pl => {
                if (!pl.response || pl.serviceError || pl.status > 300) {
                    $scope.genServerResponse = pl.serviceError || pl.response.message;
                    $scope.$apply();
                } else {
                    $scope.scope.currentStaffView = {};
                    $scope.scope.staffList = [...$scope.scope.staffList.filter(pt => pt.id !== staff.id)];
                    $scope.genServerResponse = "Staff deleted!!";
                    //funcs.loadLists();
                    $scope.$apply();
                }
            });
    };

    //show staff
    $scope.showStaffActivity = function () {
        if (!$scope.scope.searchStaffCode || $scope.scope.searchStaffCode.length < 4 ) {
            $scope.genServerResponse = "Please enter a valid staff code";
            return;
        }
        apiService.getStaffByCode($scope.scope.searchStaffCode, sessionService.sessionToken)
            .then(pl => {
                if (!pl.response || !pl.response.data) {
                    $scope.genServerResponse = pl.serviceError || pl.response.message;
                    $scope.$apply();
                } else {
                    $scope.scope.staffList = [pl.response.data];
                    for (let pat in $scope.scope.staffList) {
                        $scope.scope.staffList[pat]['dept'] = $scope.findDeptById($scope.scope.staffList[pat].departmentId);
                        $scope.scope.staffList[pat]['date'] = new Date($scope.scope.staffList[pat].joinDateTime).toDateString();
                    }
                    $scope.$apply();
                }
            });
    };
    //retstore table
    $scope.restoreTable = function () {
        funcs.loadLists();
        //$scope.$apply();
    };

    //adds new dept
    $scope.addNewStaff = function () {
        const pat = Object.assign({}, $scope.scope.currentStaffDetails);
        if ($scope.scope.selected_dept === "-") {
            $scope.newStaffServerResponse = "Please select a department!";
            return;
        }
        pat.privilegeId = Number($scope.scope.selected_privilege);
        pat.departmentId = $scope.scope.selected_dept;
        //console.log(pat);
        apiService.addStaff(pat, sessionService.sessionToken)
            .then(pl => {
                if (!pl.response || !pl.response.data) {
                    $scope.newStaffServerResponse = pl.serviceError || pl.response.message;
                    $scope.$apply();
                } else {
                    $scope.newStaffServerResponse = "New Staff added!!";
                    $scope.scope.currentStaffDetails = {};
                    funcs.loadLists();
                    $scope.$apply();
                }
            });

    };

    //edit staff
    $scope.editStaff = function () {
        const pat = Object.assign({}, $scope.scope.currentStaffView);
        pat.pwd = pat.npwd;
        apiService.updateStaff(pat, sessionService.sessionToken)
            .then(pl => {
                if (!pl.response || !pl.response.data) {
                    $scope.genServerResponse = pl.serviceError || pl.response.message;
                    $scope.$apply();
                } else {
                    $scope.scope.currentStaffView = {};
                    console.log($scope.scope.currentStaffView);
                    funcs.loadLists();
                    setTimeout(() => {
                        $scope.genServerResponse = "Staff Detail Edited!!";
                        $scope.$apply();
                    }, 300);
                }
            });

    };

    //doom manipulation
    $scope.dom = {};

    $scope.dom.staffList = true;
    $scope.dom.staffNew = false;

    $scope.hideStaffList = () => {
        $scope.dom.staffList = false;
        $scope.dom.staffNew = true;
    };
    $scope.hideStaffNew = () => {
        $scope.dom.staffList = true;
        $scope.dom.staffNew = false;
    };

    $scope.scope.privilege = {
        1: 'Manager',
        2: 'Admin',
        3: 'Staff'
    };

    //tables operations and service getting
    $scope.scope.depts = [];//patientTemplate();
    $scope.scope.staffList = [];
    $scope.findDeptById = (deptId) => getDepartmentById(deptId, $scope.scope.depts);

    funcs.loadLists = function () {
        apiService.getPatientList(sessionService.sessionToken)
            .then((payload) => {
                if (!payload.response || !payload.response.data) {
                    $scope.genServerResponse = payload.serviceError || payload.response.message;
                    $scope.$apply();
                } else {
                    $scope.scope.staffList = payload.response.data;
                    $scope.genServerResponse = "";
                    //$scope.$apply();
                    apiService.getDepartments(sessionService.sessionToken)
                        .then(pl => {
                            if (!pl.response || !pl.response.data) {
                                $scope.genServerResponse = pl.serviceError || pl.response.message;
                                $scope.$apply();
                            } else {
                                $scope.scope.depts = pl.response.data;
                                apiService.getStaffList(sessionService.sessionToken)
                                    .then(pl2 => {
                                        if (!pl2.response || !pl2.response.data) {
                                            $scope.genServerResponse = pl2.serviceError || pl2.response.message;
                                            $scope.$apply();
                                        } else {
                                            $scope.scope.staffList = pl2.response.data;
                                            for (let pat in $scope.scope.staffList) {
                                                $scope.scope.staffList[pat]['dept'] = $scope.findDeptById($scope.scope.staffList[pat].departmentId);
                                                $scope.scope.staffList[pat]['date'] = new Date($scope.scope.staffList[pat].joinDateTime).toDateString();
                                            }
                                            $scope.$apply();
                                        }
                                    });
                            }
                        });
                }
            });
    };
    funcs.loadLists();

};