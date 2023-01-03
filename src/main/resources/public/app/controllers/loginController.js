
import { ApiService } from '../services/apiservice.js';

const apiService = new ApiService();

export function LoginController($scope, $routeParams, $location, sessionService, $window) {
    $scope.scope = {
        siteTitle: "Ademolay Hismercy Hospital Management System",
        error: sessionService.loginErrorStr
    };

    $scope.scope.getLoginToken = async function (username, password) {
        $scope.scope.error = ""; //clear the error first
        this.setErrorContext = function (errStr) {
            sessionService.setLoginErrorStr(errStr);
            sessionService.destroySession();
            $scope.scope.error = errStr;
            //$window.location.href = "#/!";
            $scope.$apply();
        };
        apiService.staffLogin(username, password)
            .then(data => {
                //console.log(data);
                if (data.serviceError) {
                    this.setErrorContext("Failed to connect to backend service!");
                } else if (data.headers.status && data.headers.status !== 200) {
                    this.setErrorContext(data.response.message);
                } else if (data.status && data.status !== 200) {
                    this.setErrorContext(data.response.message);
                } else {
                    apiService.getStaffPrivilege(data.response.data.id, sessionService.sessionToken)
                        .then(pl => {
                            if (!pl.response || !pl.response.data) {
                                $scope.genServerResponse = pl.serviceError || pl.response.message;
                                $scope.$apply();
                            } else {
                                const [token, expires] = data.response.message.split(",");
                                sessionService.createSession(token.replace("token:", "").trim(), Number(expires.replace("expires:", "").trim()));
                                sessionService.userObject = data.response.data;
                                sessionService.userObject.privilege = pl.response.data;
                                //$location.path('/department').replace();
                                $window.location.href = "#!transactions";
                            }
                        });
                }
            });
    };
}
;