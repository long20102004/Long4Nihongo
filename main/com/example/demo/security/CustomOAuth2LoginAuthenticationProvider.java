//package com.example.demo.security;
//
//import com.example.demo.service.UserService;
//import org.springframework.security.authentication.AbstractAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.oauth2.client.authentication.OAuth2LoginAuthenticationProvider;
//import org.springframework.security.oauth2.client.authentication.OAuth2LoginAuthenticationToken;
//import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
//import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.stereotype.Component;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Component
//public class CustomOAuth2LoginAuthenticationProvider extends OAuth2LoginAuthenticationProvider {
//    private JwtUtility jwtUtility;
//
//    public CustomOAuth2LoginAuthenticationProvider(ClientRegistrationRepository repository, JwtUtility jwtUtility) {
//        super(repository);
//        this.jwtUtility = jwtUtility;
//    }
//
//    @Override
//    public Authentication authenticate(Authentication authentication) {
//        OAuth2LoginAuthenticationToken authResult = (OAuth2LoginAuthenticationToken) super.authenticate(authentication);
//
//        // Generate a JWT for the authenticated user
//        OAuth2User oauth2User = (OAuth2User) authResult.getPrincipal();
//        String jwt = jwtUtility.generateToken(oauth2User.getAttributes());
//
//        // Add the JWT to the OAuth2User attributes
//        Map<String, Object> attributes = new HashMap<>(oauth2User.getAttributes());
//        attributes.put("jwt", jwt);
//
//        // Create a new OAuth2User with the JWT in the attributes
//        OAuth2User newOauth2User = new DefaultOAuth2User(oauth2User.getAuthorities(), attributes, "name");
//
//        // Replace the OAuth2User with the new one in the authentication result
//        authResult = new OAuth2LoginAuthenticationToken(
//                authResult.getClientRegistration(),
//                authResult.getAuthorizationExchange(),
//                newOauth2User,
//                authResult.getAuthorities()
//        );
//
//        return authResult;
//    }
//}
