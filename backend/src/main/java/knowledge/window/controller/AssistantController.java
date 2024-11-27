package knowledge.window.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import knowledge.window.entity.Assistant;
import knowledge.window.service.AssistantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/assistant")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
public class AssistantController {

    private final AssistantService assistantService;

    @GetMapping("/all")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Set<Assistant>> getAll(@RequestParam String userName) {
        return ResponseEntity.ok()
                .body(assistantService.getAllAssistants(userName));
    }

    @DeleteMapping("/delete")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> delete(@RequestParam UUID assistantId) {
        assistantService.delete(assistantId);
        return ResponseEntity.ok().build();
    }
}
