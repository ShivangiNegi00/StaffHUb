package org.shivangi.staffhub.configs;


import org.shivangi.staffhub.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;



// to override HTTP basic authentication to perform auth by finding user in db and generate token when auth succeeds


@Configuration
public class ApplicationConfiguration {
       private final UserRepository userRepository;

       public ApplicationConfiguration(UserRepository userRepository){
              this.userRepository = userRepository;
       }

       @Bean
       UserDetailsService userDetailsService(){
            return username -> userRepository.findByEmail(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
       }

       @Bean
        BCryptPasswordEncoder passwordEncoder(){ // this will encode the password
            return new BCryptPasswordEncoder();
        }
        
        @Bean 
        public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
            return config.getAuthenticationManager();
        }

        @Bean
        AuthenticationProvider authenticationProvider(){
            DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
            
            authProvider.setUserDetailsService(userDetailsService());
            authProvider.setPasswordEncoder(passwordEncoder());

            return authProvider;
        }

 

    
}
