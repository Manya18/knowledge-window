package knowledge.window.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;

import knowledge.window.security.JwtService;


@RequiredArgsConstructor
public abstract class AbstractController {

    private final JwtService jwtService;

    protected String getUsername(HttpServletRequest request) {
        var authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        return jwtService.extractUsernameWithoutBearerPrefix(authHeader);
    }
}
