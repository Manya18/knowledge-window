package knowledge.window.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "assistant")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Assistant {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "assistant")
    private Set<File> files;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "message")
    private String message = "Хай я ивангай";

    @Column(name = "customize", length = 100000)
    private String customize;
}
