package knowledge.window.service;

import knowledge.window.entity.Assistant;
import knowledge.window.repository.AssistantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AssistantService {

    private final AssistantRepository assistantRepository;

    private final UserService userService;

    public Set<Assistant> getAllAssistants(String userName) {
        return userService.getByUsername(userName).getAssistants();
    }

    public void change(UUID id) {
        if (assistantRepository.existsById(id)){
            assistantRepository.deleteById(id);
        }
    }

    public void delete(UUID id) {
        if (assistantRepository.existsById(id)){
            assistantRepository.deleteById(id);
        }
    }
}
