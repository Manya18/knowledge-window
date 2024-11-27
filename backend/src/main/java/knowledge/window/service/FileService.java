package knowledge.window.service;

import knowledge.window.entity.Assistant;
import knowledge.window.entity.File;
import knowledge.window.repository.AssistantRepository;
import knowledge.window.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Random;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileService {

    private static final Path BASE_DIRECTORY = Path.of("files");

    private final AssistantRepository assistantRepository;

    private final FileRepository fileRepository;

    private final Random random = new Random();

    public void saveFile(
            String assistantName,
            String link,
            MultipartFile[] files,
            String message,
            String customize
    ) throws IOException {
        Path assistantDirectory = Paths.get(assistantName);

        Path directory = BASE_DIRECTORY.resolve(assistantDirectory);

        Assistant assistant;

        if (!Files.exists(directory)) {
            Files.createDirectories(directory);
            assistant = assistantRepository.save(Assistant.builder()
                    .name(assistantName)
                    .message(message)
                    .customize(customize)
                    .build()
            );
        } else {
            assistant = assistantRepository.findByName(assistantName);
        }

        if (!link.isBlank()) {
            var date = getDateFromLink(link);

            if (!date.isEmpty()) {
                Path filePath = directory.resolve(link.hashCode() + ".txt");

                Files.write(filePath, date.getBytes());

                fileRepository.save(File.builder().assistant(assistant).name(filePath.toString()).build());
            }
        }

        for (var file : files) {
            String fileName = file.getOriginalFilename();

            Path filePath = directory.resolve(fileName);

            if (Files.exists(filePath)) {
                filePath = filePath.resolve(String.valueOf(random.nextInt()));
            }

            Files.write(filePath, file.getBytes());

            fileRepository.save(File.builder().assistant(assistant).name(filePath.toString()).build());
        }
    }

    private String getDateFromLink(String link) {
        WebClient webClient = WebClient.create();

        return webClient.get()
                .uri(link)
                .retrieve()
                .bodyToMono(String.class)
                .doOnError(error -> log.error(error.getMessage()))
                .onErrorResume(error -> Mono.just(""))
                .block();
    }
}
