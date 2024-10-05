package com.example.demo.service;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig{
    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.authorizeHttpRequests(request -> {
            request.requestMatchers("/", "oauth2/**, ","login/**").permitAll().
                    anyRequest().authenticated();
        });
        httpSecurity.oauth2Login(oauth2Login -> {
          oauth2Login.defaultSuccessUrl("/loginSuccess").
                        failureUrl("/loginFail").
                  successHandler(successHandler());
        });
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        return httpSecurity.build();
    }

    @Bean
    public AuthenticationSuccessHandler successHandler(){
//        String registrationId = "google";
//        String principalName = "hoanghailonguyno@gmail.com"; // replace with the actual username
//        String accessToken = getAccessToken(registrationId, principalName);
//        System.out.println("Access Token: " + accessToken);
        return new SimpleUrlAuthenticationSuccessHandler("http://localhost:3000/landing");
    }


//    public String getAccessToken(String registrationId, String principalName) {
//        OAuth2AuthorizedClient authorizedClient = this.authorizedClientService.loadAuthorizedClient(registrationId, principalName);
//        OAuth2AccessToken accessToken = authorizedClient.getAccessToken();
//        return accessToken.getTokenValue();
//    }

}