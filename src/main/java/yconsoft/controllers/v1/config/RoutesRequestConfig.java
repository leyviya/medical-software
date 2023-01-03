package yconsoft.controllers.v1.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class RoutesRequestConfig implements WebMvcConfigurer {
    @Autowired
    AccessAuthInterceptor accessAuthInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(accessAuthInterceptor)
                .addPathPatterns("/v1/staff", "/v1/patient", "/v1/transaction")
                .excludePathPatterns("/v1/staff/staff-login");

    }
}
