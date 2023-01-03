package yconsoft.controllers.v1.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import yconsoft.beans.ResponseBean;
import yconsoft.entities.LoginSessionEntity;
import yconsoft.entities.StaffEntity;
import yconsoft.entities.StaffPrivilegeEntity;
import yconsoft.repository.LoginSessionRepository;
import yconsoft.repository.StaffPrivilegeRepository;
import yconsoft.repository.StaffRepository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

@Component
public class AccessAuthInterceptor extends HandlerInterceptorAdapter {
    //ony one session per server request
    private static StaffPrivilegeEntity currentStaffPrivileges;
    private static StaffEntity currentStaff;
    @Autowired
    LoginSessionRepository loginSessionRepository;
    @Autowired
    StaffPrivilegeRepository staffPrivilegeRepository;
    @Autowired
    StaffRepository staffRepository;

    /**
     * Performs Authentication {@code true}.
     *
     * @param request
     * @param response
     * @param handler
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Response accessResponse = performAccessMiddleWare(Optional.ofNullable(request.getHeader("token")));
        if (!accessResponse.getErrorMessage().isEmpty()) {
            response.setStatus(401);
            response.setHeader("Content-Type", "application/json");
            response.getWriter().println(new Gson().toJson(new ResponseBean<>(accessResponse.getErrorMessage())));
            return false;
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        response.setHeader("Access-Control-Allow-Origin", "*");
    }

    public static StaffPrivilegeEntity getCurrentStaffPrivileges(){
        return currentStaffPrivileges;
    }
    public static StaffEntity getCurrentStaff(){
        return currentStaff;
    }

    private Response performAccessMiddleWare(Optional<String> token){
        if(token.isEmpty()){
            return new Response("session token not found");
        }
        if(!token.get().startsWith("Bearer:")){
            return new Response("malformed session token encountered");
        }
        Optional<LoginSessionEntity> loginSession = getValidSessionToken(token.get());
        if(loginSession.isEmpty()){
            return new Response("session token is invalid");
        }
        if(System.currentTimeMillis() >= loginSession.get().getExpires()){
            loginSessionRepository.delete(loginSession.get());
            return new Response("session token has expired and has been deleted");
        }
        //if sessions is ok, lets save the current staff & privilege entity
        currentStaff = staffRepository.findById(loginSession.get().getUserId()).get();
        currentStaffPrivileges = staffPrivilegeRepository.
                findById(currentStaff.getPrivilegeId())
                .get();
        return new Response(currentStaffPrivileges); //otherwise, return empty
    }

    private Optional<LoginSessionEntity> getValidSessionToken(String sessionToken) {
        sessionToken = sessionToken.split(":")[1].trim();
        return Optional.ofNullable(loginSessionRepository.findBySessionToken(sessionToken));
    }

    public static class Response{
        private Optional<String> errorMessage = Optional.empty();
        private Optional<StaffPrivilegeEntity> resolvedEntity = Optional.empty();

        public Response(String errorMessage){
            this.errorMessage = Optional.ofNullable(errorMessage);
        }
        public Response(StaffPrivilegeEntity resolvedEntity){
            this.resolvedEntity = Optional.ofNullable(resolvedEntity);
        }
        public void setErrorMessage(String errorMessage) {
            this.errorMessage = Optional.ofNullable(errorMessage);
        }

        public void setResolvedEntity(StaffPrivilegeEntity resolvedEntity) {
            this.resolvedEntity = Optional.ofNullable(resolvedEntity);
        }

        public String getErrorMessage() {
            return errorMessage.orElse("");
        }

        public StaffPrivilegeEntity getResolvedEntity() {
            return resolvedEntity.orElse(null);
        }
    }
}