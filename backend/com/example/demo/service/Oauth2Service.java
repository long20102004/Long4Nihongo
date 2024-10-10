package com.example.demo.service;

import com.example.demo.security.JwtUtility;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class Oauth2Service extends DefaultOAuth2UserService {
    private JwtUtility jwtUtility;

    public Oauth2Service(JwtUtility jwtUtility) {
        this.jwtUtility = jwtUtility;
    }
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User user = super.loadUser(userRequest);
        String token = jwtUtility.generateOauth2Token(user);
        return user;
    }
    public String exchangeCodeForToken(String code) {
        String token = "your-token"; // Replace with actual token exchange logic
        return token;
    }
}