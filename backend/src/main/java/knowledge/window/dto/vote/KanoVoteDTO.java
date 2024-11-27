package knowledge.window.dto.vote;

import java.util.UUID;

public record KanoVoteDTO(
        UUID voteId,
        UUID voteOptionsId,
        UUID userId,
        String positiveResponse,
        String negativeResponse
) {
}

