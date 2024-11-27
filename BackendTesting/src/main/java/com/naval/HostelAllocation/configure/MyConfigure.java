package com.naval.HostelAllocation.configure;

import lombok.RequiredArgsConstructor;
import com.naval.HostelAllocation.helper.RequestInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@RequiredArgsConstructor
public class MyConfigure implements WebMvcConfigurer {

    private final RequestInterceptor requestInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // Apply the interceptor to all endpoints except /auth/login
        registry.addInterceptor(requestInterceptor)
                .addPathPatterns("/**")
            //    .excludePathPatterns("/api/user/login", "/api/user/createUser");
                .excludePathPatterns("/login", "/student");
    }
}
