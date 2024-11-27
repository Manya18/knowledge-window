package knowledge.window.repository;

import knowledge.window.entity.Assistant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AssistantRepository extends JpaRepository<Assistant, UUID> {
    Assistant findByName(String assistantName);
}
