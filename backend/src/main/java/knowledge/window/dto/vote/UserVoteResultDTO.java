package knowledge.window.dto.vote;

import java.util.List;

public record UserVoteResultDTO (

        String option,

        List<VoteOptionWithCountAndPercent> voteOptionWithCountAndPercent
) {
}

