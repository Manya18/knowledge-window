package knowledge.window.service;

import knowledge.window.dto.request.QueryRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class OllamaService {

    public String getResponse(String question, String assistantName) {
        WebClient webClient = WebClient.create();

        return webClient.post()
                .uri("http://localhost:5000/api/query")
                .bodyValue(
                        new QueryRequest(question, assistantName)
                )
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
