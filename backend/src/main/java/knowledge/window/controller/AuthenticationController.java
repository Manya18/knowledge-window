package knowledge.window.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import knowledge.window.dto.request.LoginRequest;
import knowledge.window.dto.request.RegistrationRequest;
import knowledge.window.dto.response.TokenResponse;
import knowledge.window.service.AuthenticationService;

@RestController
@RequestMapping(value = "/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @Operation(summary = "Получить все голосования", description = "Возвращает информацию о всех голосованиях.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Успешно получена информация о голосованиях"),
                    @ApiResponse(responseCode = "400", description = "Неверные параметры запроса")
            }
    )
    @PostMapping("/registration")
    public ResponseEntity<TokenResponse> register(@Valid @RequestBody RegistrationRequest registrationRequest) {
        return ResponseEntity.ok()
                .body(authenticationService.register(registrationRequest));
    }

    @Operation(summary = "Получить все голосования", description = "Возвращает информацию о всех голосованиях.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Успешно получена информация о голосованиях"),
                    @ApiResponse(responseCode = "400", description = "Неверные параметры запроса")
            }
    )
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok()
                .body(authenticationService.login(loginRequest));
    }
}
