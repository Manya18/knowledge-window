package knowledge.window.dto.vote;

import java.util.UUID;

public record CSIVoteDto (
        UUID voteId,
        UUID voteOptionsId,
        UUID userId,
        Integer userRating
) {
}
