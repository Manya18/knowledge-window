package knowledge.window.controller;


import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import knowledge.window.security.JwtService;
import knowledge.window.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/file")
@SecurityRequirement(name = "Bearer Authentication")
public class FileController extends AbstractController {

    private final FileService fileService;

    public FileController(JwtService jwtService, FileService fileService) {
        super(jwtService);
        this.fileService = fileService;
    }

    @PostMapping(value = "/upload")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> uploadFile(
            HttpServletRequest request,
            @RequestParam("assistantName") String assistantName,
            @RequestParam("link") String link,
            @RequestParam("files") MultipartFile[] files,
            @RequestParam("message") String message,
            @RequestParam("customize") String customize
    ) throws IOException {
        var userName = getUsername(request);
        fileService.saveFile(assistantName, link, files, message, customize, userName);

        return ResponseEntity.ok().build();
    }
}
