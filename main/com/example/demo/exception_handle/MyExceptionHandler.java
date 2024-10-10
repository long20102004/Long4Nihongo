package com.example.demo.exception_handle;

import com.example.demo.model.JwtResponse;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.SignatureException;

@ControllerAdvice
@ResponseBody
public class MyExceptionHandler {
    @ExceptionHandler(UserExistedException.class)
    public ResponseEntity<ErrorMessage> userExistedHandler(UserExistedException exception){
        ErrorMessage message = new ErrorMessage(HttpStatusCode.valueOf(600), exception.getMessage());
        return new ResponseEntity<>(message, HttpStatus.NOT_ACCEPTABLE);
    }
    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<ErrorMessage> wrongToken(UserExistedException exception){
        ErrorMessage message = new ErrorMessage(HttpStatusCode.valueOf(600), exception.getMessage());
        return new ResponseEntity<>(message, HttpStatus.UNAUTHORIZED);
    }
}
