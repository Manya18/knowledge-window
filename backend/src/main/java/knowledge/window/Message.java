package knowledge.window;

import java.util.List;

public record Message
        (
                String model,
                String created_at,
                String response,

                Boolean done,
                String done_reason,
                List<Integer> context,

                Long total_duration,
                Long load_duration,
                Long      prompt_eval_count,
                Long prompt_eval_duration,
                Long        eval_count,
                Long       eval_duration
        )
{
}
