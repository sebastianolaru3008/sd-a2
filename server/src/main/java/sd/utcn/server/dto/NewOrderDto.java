package sd.utcn.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class NewOrderDto {
    private String customerId;
    private List<NewOrderedFoodDto> orderedFoods;
    private String restaurantId;
}
