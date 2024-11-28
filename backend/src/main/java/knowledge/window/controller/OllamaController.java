package knowledge.window.controller;

import knowledge.window.service.OllamaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ollama")
@RequiredArgsConstructor
public class OllamaController {

    private final OllamaService ollamaService;

    @PostMapping("/generate")
    public ResponseEntity<String> generate(
        @RequestParam("question") String question,
        @RequestParam("assistantName") String assistantName) {

        return ResponseEntity.ok().body(ollamaService.getResponse(question, assistantName));
    }
}
