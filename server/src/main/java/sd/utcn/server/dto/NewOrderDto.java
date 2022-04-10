package sd.utcn.server.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class NewOrderDto {
    private String customerId;
    private List<NewOrderedFoodDto> orderedFoods;
    private String restaurantId;
}
