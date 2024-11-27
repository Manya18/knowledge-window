package knowledge.window.controller;


import knowledge.window.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @PostMapping(value = "/upload")
    public ResponseEntity<Void> uploadFile(
            @RequestParam("assistantName") String assistantName,
            @RequestParam("link") String link,
            @RequestParam("files") MultipartFile[] files,
            @RequestParam("message") String message,
            @RequestParam("customize") String customize
    ) throws IOException {

        fileService.saveFile(assistantName, link, files, message, customize);

        return ResponseEntity.ok().build();
    }

//    @PostMapping(value = "/upload1", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public @ResponseBody String handleFileUpload1(
//            @RequestParam("name") String name,
//            @RequestPart("file") MultipartFile file) {
//        if (!file.isEmpty()) {
//            var n = file.getOriginalFilename();
//            Path path = Paths.get(name + file.getName());
//
//            try {
//                byte[] bytes = file.getBytes();
//                Files.write(path, bytes); // Записываем байты в файл
//                return "Вы удачно загрузили " + name + " в " + path.toString();
//            } catch (Exception e) {
//                return "Вам не удалось загрузить " + name + " => " + e.getMessage();
//            }
//        } else {
//            return "Вам не удалось загрузить " + name + " потому что файл пустой.";
//        }
//    }
//
//    private final String uploadDir = "uploads"; // Директория для сохранения файлов
//
//    @PostMapping(value = "/upload2", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public String uploadFile1(@RequestParam("file") MultipartFile file) {
//        if (file.isEmpty()) {
//            return "Файл пустой, загрузка не удалась.";
//        }
//
//        try {
//            // Создаем директорию, если она не существует
//            Path directory = Paths.get(uploadDir);
//            if (!Files.exists(directory)) {
//                Files.createDirectories(directory);
//            }
//
//            // Получаем имя файла и создаем путь
//            String fileName = file.getOriginalFilename();
//            Path filePath = directory.resolve(fileName);
//
//            // Записываем файл на сервер
//            Files.write(filePath, file.getBytes());
//
//            return "Файл " + fileName + " успешно загружен!";
//        } catch (IOException e) {
//            return "Ошибка при загрузке файла: " + e.getMessage();
//        }
//    }
//
//    @PostMapping("/upload3")
//    public String uploadFil1e() {
//        WebClient webClient = WebClient.create();
//        var l = webClient.post()
//                .uri("http://localhost:11434/api/generate")
//                .bodyValue(new Body(
//                        "choose-a-model-name111",
//                        "Расскажи про умскул",
//                        false
//                ))
//                .retrieve()
//                .bodyToMono(Message.class)
//                .block();
//
//        return l.response();
//    }
//
//    @PostMapping("/upload4")
//    public String uploadFil1e1(@RequestBody String name) {
//        WebClient webClient = WebClient.create();
//        var l = webClient.post()
//                .uri("http://localhost:11434/api/embed")
//                .bodyValue(
//                        new Tech(
//                                "choose-a-model-name111",
//                                name
//                        )
//                )
//                .retrieve()
//                .bodyToMono(Message.class)
//                .block();
//
//        return l.response();
//    }


}
