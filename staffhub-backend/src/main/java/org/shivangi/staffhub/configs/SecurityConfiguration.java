package org.shivangi.staffhub.configs;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.security.config.Customizer;  

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // restrict user based on their roles -
public class SecurityConfiguration { 
    private final AuthenticationProvider authenticationProvider;    
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfiguration(JwtAuthenticationFilter jwtAuthenticationFilter, AuthenticationProvider authenticationProvider){
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.authenticationProvider = authenticationProvider;
    }

    @Bean 
    public SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception{
        http
        .csrf(csrf -> csrf.disable())
        .cors(Customizer.withDefaults())
        .authorizeHttpRequests(requests -> requests
            .requestMatchers("/auth/**").permitAll()
          .anyRequest().authenticated()
        )
        .sessionManagement(session -> session
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        )
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build(); 
    }

    @Bean 
    CorsConfigurationSource corsConfigurationSource(){
         CorsConfiguration configuration = new CorsConfiguration();

         configuration.setAllowedOrigins(List.of("http://localhost:3000")); // allow requests from this origin
         configuration.setAllowedMethods(List.of("GET","POST"));
         configuration.setAllowedHeaders(List.of("authorization","content-Type","Cache-Control"));

         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

         source.registerCorsConfiguration("/**",configuration);

         return source;


    }
}
 