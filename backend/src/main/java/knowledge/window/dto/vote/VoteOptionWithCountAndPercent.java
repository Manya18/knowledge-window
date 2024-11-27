package knowledge.window.dto.vote;

public record VoteOptionWithCountAndPercent(
        String classification,

        Long count,

        Double percent
) {
}
