package org.shivangi.staffhub.exceptions;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException ;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ResponseStatus;  


@RestControllerAdvice // this annotation is used to handle exceptions globally
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class) 
    public ProblemDetail handleSecurtiyException(Exception exception) {
        ProblemDetail errorDetail = null;
        
        //TODO send this stack trace to an observability tool
        exception.printStackTrace(); 

        if(exception instanceof BadCredentialsException){
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(401),exception.getMessage());
            errorDetail.setProperty("description","The username or password is incorrect");
            return errorDetail;
        }

        if(exception instanceof AccountStatusException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403),exception.getMessage());
            errorDetail.setProperty("description","The account is locked");
            
        }

        if(exception instanceof AccessDeniedException){
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403),exception.getMessage());
            errorDetail.setProperty("description","you are not authorized to access this resource");

        }

        if(exception instanceof SignatureException){
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403),exception.getMessage());
            errorDetail.setProperty("description","The JWT signature is invalid");
        }
        
        if(exception instanceof ExpiredJwtException){
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403),exception.getMessage());
            errorDetail.setProperty("description","The JWT has expired");
        }

        if(errorDetail == null) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(500),exception.getMessage());
            errorDetail.setProperty("description","Unknown internal server error");
        }

        return errorDetail;

    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<String> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
}
