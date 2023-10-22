// package com.joaco.restaurantflowserver.config;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.config.Customizer;

// @EnableWebSecurity
// @Configuration
// public class SecurityConfiguration {

//   public PasswordEncoder encoder() {
//     return new BCryptPasswordEncoder();
//   }

//   public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//     http.authorizeHttpRequests(req -> req
//         .anyRequest().permitAll())
//         .formLogin(Customizer.withDefaults())
//         .httpBasic(Customizer.withDefaults());

//     // http.securityContext(sc -> sc.requireExplicitSave(false));
//     // http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.ALWAYS));

//     http.cors(cors -> cors.disable());
//     http.csrf(csrf -> csrf.disable());

//     return http.build();
//   }

// }
