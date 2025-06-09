package org.shivangi.staffhub.exceptions;
import java.lang.RuntimeException;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String message) {
        super(message);
    }

    
}
