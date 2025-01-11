package com.example.demo.security;

import com.example.demo.model.InvalidToken;
import com.example.demo.repository.InvalidTokenRepository;
import com.example.demo.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {
    private JwtUtility jwtUtility;
    private UserService userService;
    @Autowired
    private InvalidTokenRepository invalidTokenRepository;

    @Autowired
    public JwtTokenFilter(JwtUtility jwtTokenUtil, UserService userService) {
        this.jwtUtility = jwtTokenUtil;
        this.userService = userService;
    }

    // src/main/java/com/example/demo/security/JwtTokenFilter.java

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        String jwt = null;
        if (StringUtils.hasText(header) && header.startsWith("Bearer ")) {
            jwt = header.substring(7);
            System.out.println("Extracted JWT: " + jwt);
            InvalidToken invalidToken = invalidTokenRepository.getInvalidTokenByToken(jwt);
            if (invalidToken != null) {
                System.out.println("Token is invalid: " + jwt);
                jwt = null;
            }
        } else {
            System.out.println("Authorization header is missing or does not start with Bearer");
        }

        if (jwt != null) {
            try {
                String username = jwtUtility.extractUserName(jwt);
                UserDetails userDetails = userService.loadUserByUsername(username);
                if (jwtUtility.isTokenValid(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities()
                    );
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            } catch (JwtException exception) {
                System.out.println("TOKEN IS EXPIRED OR INVALID");
            }
        } else {
            System.out.println("JWT is null");
        }

        filterChain.doFilter(request, response);
    }
}
