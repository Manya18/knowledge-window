package knowledge.window.service;

import knowledge.window.entity.Assistant;
import knowledge.window.repository.AssistantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AssistantService {

    private final AssistantRepository assistantRepository;

    private final UserService userService;

    private final FileService fileService;

    public Set<Assistant> getAllAssistants(String userName) {
        return userService.getByUsername(userName).getAssistants();
    }

    public Assistant getByName(String name) {
        return assistantRepository.findByName(name);
    }

    public void change(UUID id) {
        if (assistantRepository.existsById(id)){
            assistantRepository.deleteById(id);
        }
    }

    public void delete(UUID id) throws IOException {
        if (assistantRepository.existsById(id)){
            var assistant = assistantRepository.getReferenceById(id);

            fileService.deleteFiles(assistant.getName());

            assistantRepository.deleteById(id);
        }
    }
}
