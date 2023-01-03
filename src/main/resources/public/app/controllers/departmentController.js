
import { ApiService } from '../services/apiservice.js';
import {
    getDepartmentById,
    getPatientById,
    getStaffById
} from '../services/apiHelperService.js';
import { patientTemplate } from '../templates/jsonDumps.js';

const apiService = new ApiService();

export function DepartmentController($scope, $routeParams, $location, sessionService, $window) {
    $scope.scope = {};
    $scope.scope.siteTitle = "Ademolay Hismercy Hospital";
    $scope.user = sessionService.userObject;
    const funcs = {};

    $scope.genServerResponse = "";
    $scope.newDepartmentServerResponse = "";
    $scope.$watch('newDepartmentServerResponse', function () {
        setTimeout(() => {
            $scope.newDepartmentServerResponse = "";
            $scope.$apply();
        }, 4000);
    }, true);
    $scope.$watch('genServerResponse', function () {
        setTimeout(() => {
            $scope.genServerResponse = "";
            $scope.$apply();
        }, 4000);
    }, true);

    //new dept state store
    $scope.scope.currentDeptDetails = {};

    //delete patient //funcs.loadLists();
    $scope.deleteDepartment = function(department){
        if(!confirm(`Are you sure you want to delete department ${department.title}?`)){
            return;
        }
        apiService.deleteDepartment(department.id, sessionService.sessionToken)
            .then(pl => {
                if (!pl.response || pl.serviceError || pl.status > 300) {
                    $scope.genServerResponse = pl.serviceError || pl.response.message;
                    $scope.$apply();
                } else {
                    $scope.scope.departments = [...$scope.scope.departments.filter(pt=> pt.id !== department.id)];
                    $scope.genServerResponse  = "Department deleted!!";
                    //funcs.loadLists();
                    $scope.$apply();
                }
            });
    };

    //adds new dept
    $scope.addNewDept = function () {
        apiService.addDepartment({
            title: $scope.scope.currentDeptDetails.title,
            description : $scope.scope.currentDeptDetails.description
        }, sessionService.sessionToken)
            .then(pl => {
                if (!pl.response || !pl.response.data) {
                    $scope.newDepartmentServerResponse = pl.serviceError || pl.response.message;
                    $scope.$apply();
                } else {
                    $scope.newDepartmentServerResponse = "New Department added!!";
                    $scope.scope.currentDeptDetails = {};
                    funcs.loadLists();
                    $scope.$apply();
                }
            });

    };

    //doom manipulation
    $scope.dom = {};

    $scope.dom.deptList = true;
    $scope.dom.deptNew = false;

    $scope.hideDeptList = () => {
        $scope.dom.deptList = false;
        $scope.dom.deptNew = true;
    };
    $scope.hideDeptNew = () => {
        $scope.dom.deptList = true;
        $scope.dom.deptNew = false;
    };


    //tables operations and service getting
    $scope.scope.departments = [];
    $scope.scope.staffList = [];
    $scope.findStaffById = (staffId) => getStaffById(staffId, $scope.scope.staffList);

    funcs.loadLists = function () {
        apiService.getDepartments(sessionService.sessionToken)
            .then((payload) => {
                if (!payload.response || !payload.response.data) {
                    $scope.genServerResponse = payload.serviceError || payload.response.message;
                    $scope.$apply();
                } else {
                    $scope.scope.departments = payload.response.data;
                    $scope.genServerResponse = "";
                    $scope.$apply();
                }
            });
    };
    funcs.loadLists();

};