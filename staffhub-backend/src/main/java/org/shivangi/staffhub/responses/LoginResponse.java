package org.shivangi.staffhub.responses;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor


public class LoginResponse {

    private String token;
    private long expiresIn;
    private Integer userId;


    public LoginResponse setToken(String token) {
        this.token = token;
        return this;
    }

    public LoginResponse setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }

    public LoginResponse setUserId(Integer userId) {
        this.userId = userId;
        return this;
    }

}
