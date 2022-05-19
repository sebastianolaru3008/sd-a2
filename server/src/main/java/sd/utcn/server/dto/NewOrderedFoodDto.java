package sd.utcn.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.bytebuddy.asm.Advice;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NewOrderedFoodDto {
    private String foodId;
    private Integer quantity;
}
