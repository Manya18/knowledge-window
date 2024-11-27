package knowledge.window.dto.request;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record FormData(
        String assistantName,
        String link,
        MultipartFile[] files
) {
}
