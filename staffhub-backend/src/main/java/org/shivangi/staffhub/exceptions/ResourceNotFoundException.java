package org.shivangi.staffhub.exceptions;
import java.lang.RuntimeException;

public class ResourceNotFoundException extends RuntimeException {
    
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
