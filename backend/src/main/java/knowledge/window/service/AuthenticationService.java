package knowledge.window.service;

import knowledge.window.mapper.UserMapper;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import knowledge.window.dto.request.LoginRequest;
import knowledge.window.dto.request.RegistrationRequest;
import knowledge.window.dto.response.TokenResponse;
import knowledge.window.security.JwtService;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    private final UserService userService;

    private final UserDetailsService userDetailsService;

    private final UserMapper mapper;

    public TokenResponse register(RegistrationRequest registrationRequest) {
        userService.registerUser(mapper.toEntity(registrationRequest));

        UserDetails userDetails = userDetailsService.loadUserByUsername(registrationRequest.username());

        var token = jwtService.generateToken(userDetails);

        var refreshToken = jwtService.generateRefreshToken(userDetails);

        return new TokenResponse(token, refreshToken);
    }

    public TokenResponse login(LoginRequest loginRequest) throws UsernameNotFoundException {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.username(), loginRequest.password()));

        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.username());

        var token = jwtService.generateToken(
                Map.of("role", userService.getRolesByUsername(loginRequest.username())),
                userDetails
        );

        var refreshToken = jwtService.generateRefreshToken(userDetails);

        return new TokenResponse(token, refreshToken);
    }
}