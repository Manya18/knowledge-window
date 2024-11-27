//package knowledge.window.controller;
//
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.reactive.function.client.WebClient;
//
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//
//@RestController
//@RequestMapping("/api/ollama")
//public class OllamaController {
//    @PostMapping("/generate")
//    public String generate(@RequestParam("model") String model,
//                              @RequestParam("prompt") String prompt) throws IOException {
//
//        var context = Files.readString(Path.of("11111file.docx"));
//
//        WebClient webClient = WebClient.create();
//        var l = webClient.post()
//                .uri("http://localhost:11434/api/generate")
//                .bodyValue(new Body(
//                        model,
//                        "В тексте:\\n" + context + "\\n\\nОтветьте на запрос: " + prompt,
//                        false
//                ))
//                .retrieve()
//                .bodyToMono(Message.class)
//                .block();
//
//        return l.response();
//    }
//
//   /* @PostMapping("/generate2")
//    public String generate2(@RequestParam("model") String model,
//                           @RequestParam("prompt") String prompt) throws IOException, Docx4JException {
//
//        // Load document
//        WordprocessingMLPackage wordMLPackage = WordprocessingMLPackage.load(new File("11111file.docx"));
//// Load main document part
//        MainDocumentPart mainDocumentPart = wordMLPackage.getMainDocumentPart();
//// Extract nodes
//        String textNodesXPath = "//w:t";
//        List<Object> textNodes= mainDocumentPart.getJAXBNodesViaXPath(textNodesXPath, true);
//        var texte ="";
//// Print text
//        for (Object obj : textNodes) {
//          //  Text text = (Text) ((JAXBElement<?>)obj).getValue();
//           // texte += texte.getValue();
//        }
//
//
//        WebClient webClient = WebClient.create();
//        var l = webClient.post()
//                .uri("http://localhost:11434/api/generate")
//                .bodyValue(new Body(
//                        model,
//                        "В тексте:\\n" + texte + "\\n\\nОтветьте на запрос: " + prompt,
//                        false
//                ))
//                .retrieve()
//                .bodyToMono(Message.class)
//                .block();
//
//        return l.response();
//    }*/
//
//    @PostMapping("/embed")
//    public String embed(@RequestBody String name) {
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
//
//    @PostMapping("/embed1")
//    public String embed1(@RequestBody String name1) {
//        WebClient webClient = WebClient.create();
//        var l = webClient.post()
//                .uri("http://localhost:11434/api/embed")
//                .bodyValue(
//                        new Tech(
//                                "choose-a-model-name111",
//                                name1
//                        )
//                )
//                .retrieve()
//                .bodyToMono(Message.class)
//                .block();
//
//        return l.response();
//    }
//
//    @PostMapping("/generate1")
//    public String generate1(@RequestParam("model") String model,
//                           @RequestParam("prompt") String prompt) throws IOException {
//
//        var context = Files.readString(Path.of("1123file"));
//
//        WebClient webClient = WebClient.create();
//        var l = webClient.post()
//                .uri("http://localhost:11434/api/generate")
//                .bodyValue(new Body(
//                        model,
//                        prompt,
//                        false
//                ))
//                .retrieve()
//                .bodyToMono(Message.class)
//                .block();
//
//        return l.response();
//    }
//}
