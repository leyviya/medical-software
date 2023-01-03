

export function LogoutController($scope, $routeParams, $location, sessionService, $window) {
        sessionService.destroySession();
        $window.location.href = "#/!";
};