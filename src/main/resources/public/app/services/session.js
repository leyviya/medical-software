
export function SessionService(){
    this.isLoggedIn = false;
    this.sessionToken = "";
    this.loginErrorStr = "";
    this.userObject = {};
    this.expires = "";

    this.setSessionToken = function(token){
        this.sessionToken = token;
    };
    this.setExpires = function(expires){
        this.expires = expires;
    };
    this.setLoginErrorStr = function(errorStr){
        this.loginErrorStr = errorStr;
    }
    this.createSession = function(token, expires){
        this.setSessionToken(token);
        this.setExpires(expires);
        this.isLoggedIn = true;
        this.setLoginErrorStr("");
    };
    this.destroySession = function (){
        this.sessionToken = "";
        this.isLoggedIn = false;
        this.userObject = null;
        this.expires = 0;
        this.loginErrorStr = "Session Logged out!";
    };
}