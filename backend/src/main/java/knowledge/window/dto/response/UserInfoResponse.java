package knowledge.window.dto.response;

import lombok.Builder;

@Builder
public record UserInfoResponse(
        String surname,
        String firstName,
        String gender,
        String username,
        String email
) {
}
