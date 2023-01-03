
import { ApiService } from '../services/apiservice.js';
import { printInvoice } from '../services/printService.js';
import exportCsv from '../services/csvExportService.js';
import {
    getDepartmentById,
    getPatientById,
    getStaffById
} from '../services/apiHelperService.js';
const apiService = new ApiService();

export function TransactionsController($scope, $routeParams, $location, sessionService, $window) {
    $scope.scope = {};
    $scope.scope.siteTitle = "Ademolay Hismercy Hospital";
    $scope.user = sessionService.userObject;
    const funcs = {};

    $scope.newTransServerResponse = "";
    $scope.genServerResponse = "";
    $scope.genNotif = "";
    $scope.$watch('newTransServerResponse', function () {
        setTimeout(() => $scope.newTransServerResponse = "", 4000);
    }, true);
    $scope.$watch('genServerResponse', function () {
        $scope.genNotif = "";
        setTimeout(() => $scope.genServerResponse = "", 4000);
    }, true);
    $scope.$watch('genNotif', function () {
        $scope.genServerResponse = "";
        setTimeout(() => $scope.genNotif = "", 4000);
    }, true);

    //model to hold current trans items
    $scope.scope.currentTransDetails = [];
    $scope.addTransDetail = function () {
        if ($scope.scope.currentTransDetails.length > 0) {
            const lastItem = $scope.scope.currentTransDetails[$scope.scope.currentTransDetails.length - 1];
            if (lastItem.itemQuantity === 0 || lastItem.itemDescription.length === 0 || lastItem.itemPrice === 0) {
                $scope.newTransServerResponse = "Please fill in the last item entry fully first";
                return;
            }
        }
        $scope.scope.currentTransDetails.push({
            itemQuantity: 0,
            itemPrice: 0,
            itemDescription: ""
        });
    };
    funcs.resetTransDetails = function () {
        $scope.scope.currentTransDetails = [];
        $scope.scope.currentTransDetails.push({
            itemQuantity: 0,
            itemPrice: 0,
            itemDescription: ""
        });
    }
    ///init with one value
    $scope.scope.selected_dept = "-";
    $scope.addTransDetail();

    //adds new trans
    $scope.addNewTrans = function (deptId) {
        const that = this;
        if (isNaN(deptId)) {
            $scope.newTransServerResponse = "Please select a valid department first";
            return;
        }
        if ($scope.scope.currentTransDetails[$scope.scope.currentTransDetails.length - 1].itemQuantity === '0') {
            $scope.scope.currentTransDetails.pop();
        }
        if ($scope.scope.currentTransDetails.length === 1 && $scope.scope.currentTransDetails[0].itemQuantity === 0) {
            $scope.newTransServerResponse = "Please enter some transaction details first";
            return;
        }
        const details = [...$scope.scope.currentTransDetails];
        for (let index in details) {
            delete details[index]['$$hashKey'];
        }
        apiService.addTransaction({
            staffId: sessionService.userObject.id,
            departmentId: Number(deptId),
            transactionItemDetailEntities: details
        }, sessionService.sessionToken).then(pl => {
            if (!pl.response || !pl.response.data) {
                $scope.newTransServerResponse = pl.serviceError || pl.response.message;
                $scope.$apply();
            } else {
                $scope.newTransServerResponse = "New Transaction added!!";
                funcs.resetTransDetails();
                funcs.loadLists();
                $scope.$apply();
            }
        });

    };

    //break transaction
    $scope.breakTransaction = function (transId) {
        apiService.breakTransaction(transId, sessionService.sessionToken)
            .then(pl => {
                if (!confirm("Breaking this transaction cannot be reversed, Are you sure?")) {
                    return;
                }
                if (pl.serviceError || !pl.response || pl.status > 300) {
                    $scope.genServerResponse = pl.serviceError || pl.response.message;
                    $scope.$apply();
                } else {
                    let ind = $scope.scope.transactions.findIndex(trans => trans.id === transId);
                    $scope.scope.transactions[ind].broken = true;
                    $scope.genServerResponse = "Transaction broken!!";
                    $scope.$apply();
                }
            });
    };

    //show transaction by date
    $scope.showTransactionDateList = function () {
        if (!$scope.scope.searchTransDate) {
            $scope.genServerResponse = "Please enter a valid date";
            $scope.$apply();
            return;
        }
        const dateObj = new Date($scope.scope.searchTransDate);
        const dateExtract = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
        const endDate = new Date(dateExtract + ' 23:59').toISOString();
        const beginDate = new Date(dateExtract + ' 1:00').toISOString();
        apiService.getTransactionByDate(beginDate, endDate, sessionService.sessionToken)
            .then(pl => {
                if (!pl.response || !pl.response.data) {
                    $scope.genServerResponse = pl.serviceError || pl.response.message;
                } else {
                    $scope.scope.transactions = pl.response.data;
                    for (let trans in $scope.scope.transactions) {
                        $scope.scope.transactions[trans]['department'] = $scope.findDeptById($scope.scope.transactions[trans].departmentId);
                        $scope.scope.transactions[trans]['staff'] = $scope.findStaffById($scope.scope.transactions[trans].staffId);
                        $scope.scope.transactions[trans]['date'] = new Date($scope.scope.transactions[trans].dateTime).toGMTString().replace("GMT", "");
                    }
                    if ($scope.scope.transactions.length > 0) {
                        $scope.genNotif = `Total: ${$scope.scope.transactions.length}, Broken: ${$scope.scope.transactions.filter(tr => tr.broken).length}`
                        $scope.genNotif += `, Total Money: N${$scope.scope.transactions.map(tr => tr.broken ? 0 : $scope.sumTransactDetailsCost(tr.transactionItemDetailEntities)).reduce((prev, cur) => prev += cur)}`;
                    }else{
                        $scope.genServerResponse = "No transaction records exist for this date";
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

    //exports
    $scope.scope.exportCsv = (tableData)=> {
        const arr = [['Date', 'Department', 'Staff Admin', 'Total Cost']];
        tableData.forEach((objRow)=> {
            arr.push([
                `"${objRow.date}"`,
                objRow.department.title, 
                objRow.staff.username,
                $scope.sumTransactDetailsCost(objRow.transactionItemDetailEntities)
            ]);
        });
        exportCsv(arr);
    };

    //doom manipulation
    $scope.doc = {};

    $scope.doc.transList = true;
    $scope.doc.transNew = false;

    $scope.hideTransList = () => {
        $scope.doc.transList = false;
        $scope.doc.transNew = true;
    };
    $scope.hideTransNew = () => {
        $scope.doc.transList = true;
        $scope.doc.transNew = false;
    };

    //invoice printing
    $scope.scope.currentInvoice = {};
    $scope.scope.currentInvoiceDate = {};

    $scope.setCurrentInvoice = function (transactionDetails, date, tid) {
        $scope.scope.currentInvoice = transactionDetails;
        $scope.scope.currentInvoiceDate = date;
        $scope.scope.currentInvoiceId = tid;
    }
    $scope.sumTransactDetailsCost = function (transactDetail) {
        let sum = 0;
        for (let detail of transactDetail) {
            sum += detail.itemPrice;
        }
        return sum;
    };

    $scope.printCurrentInvoice = printInvoice;

    //tables operations and service getting
    //$scope.scope.transactions = transactionTemplate();
    $scope.scope.depts = [];
    $scope.scope.staffList = [];
    $scope.scope.transactions = [];
    $scope.findDeptById = (deptId) => getDepartmentById(deptId, $scope.scope.depts);
    $scope.findStaffById = (staffId) => getStaffById(staffId, $scope.scope.staffList);

    funcs.loadLists = function () {
        apiService.getTransactions(sessionService.sessionToken)
            .then((payload) => {
                //console.log(payload);
                if (!payload.response || !payload.response.data) {
                    $scope.genServerResponse = payload.serviceError || payload.response.message;
                    $scope.$apply();
                } else {
                    $scope.scope.transactions = payload.response.data;
                    $scope.genServerResponse = "";
                    $scope.$apply();
                    apiService.getDepartments(sessionService.sessionToken)
                        .then(pl => {
                            if (!pl.response || !pl.response.data) {
                                $scope.genServerResponse = pl.serviceError || pl.response.message;
                                $scope.$apply();
                            } else {
                                $scope.scope.depts = pl.response.data;
                            }
                        });
                    apiService.getStaffList(sessionService.sessionToken)
                        .then(pl => {
                            if (!pl.response || !pl.response.data) {
                                $scope.genServerResponse = pl.serviceError || pl.response.message;
                            } else {
                                $scope.scope.staffList = pl.response.data;
                                for (let trans in $scope.scope.transactions) {
                                    $scope.scope.transactions[trans]['department'] = $scope.findDeptById($scope.scope.transactions[trans].departmentId);
                                    $scope.scope.transactions[trans]['staff'] = $scope.findStaffById($scope.scope.transactions[trans].staffId);
                                    $scope.scope.transactions[trans]['date'] = new Date($scope.scope.transactions[trans].dateTime).toGMTString().replace("GMT", "");
                                }
                            }
                            $scope.$apply();
                        });
                }
            });
    };
    funcs.loadLists();

};