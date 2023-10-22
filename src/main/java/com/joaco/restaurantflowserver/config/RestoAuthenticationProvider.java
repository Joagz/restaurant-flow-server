// package com.joaco.restaurantflowserver.config;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.authentication.AuthenticationProvider;
// import org.springframework.security.authentication.BadCredentialsException;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.AuthenticationException;
// import org.springframework.security.crypto.password.PasswordEncoder;

// import com.joaco.restaurantflowserver.model.Admin;
// import com.joaco.restaurantflowserver.repos.AdminRepository;

// public class RestoAuthenticationProvider implements AuthenticationProvider {

//   @Autowired
//   private AdminRepository repository;

//   @Autowired
//   private PasswordEncoder encoder;

//   @Override
//   public Authentication authenticate(Authentication authentication) throws AuthenticationException {

//     String name = authentication.getName();
//     String password = authentication.getCredentials().toString();

//     List<Admin> admins = repository.findByName(name);

//     if (admins.size() > 0) {
//       if (encoder.matches(admins.get(0).getPassword(), password)) {
//         return new UsernamePasswordAuthenticationToken(name, password);
//       } else {
//         throw new BadCredentialsException("Invalid password.");
//       }

//     } else {
//       throw new BadCredentialsException("Entity not found.");
//     }

//   }

//   @Override
//   public boolean supports(Class<?> authentication) {
//     return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
//   }

// }
