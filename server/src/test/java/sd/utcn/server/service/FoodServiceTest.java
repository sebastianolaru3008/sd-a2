package sd.utcn.server.service;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import sd.utcn.server.dto.CustomerDto;
import sd.utcn.server.dto.FoodDto;
import sd.utcn.server.dto.NewFoodDto;
import sd.utcn.server.model.Food;
import sd.utcn.server.model.Restaurant;
import sd.utcn.server.model.state.FoodCategory;
import sd.utcn.server.repository.CustomerRepository;
import sd.utcn.server.repository.FoodRepository;
import sd.utcn.server.repository.RestaurantRepository;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class FoodServiceTest {

    @MockBean
    private final FoodRepository foodRepository;
    @MockBean
    private final RestaurantRepository restaurantRepository;

    private final FoodService foodService;

    @Autowired
    public FoodServiceTest(FoodRepository foodRepository, RestaurantRepository restaurantRepository, FoodService foodService) {
        this.foodRepository = foodRepository;
        this.restaurantRepository = restaurantRepository;
        this.foodService = foodService;
    }

    @Test
    public void addFoodToRestaurantTest() throws Exception {
        String restaurantId = UUID.randomUUID().toString();
        String foodId = UUID.randomUUID().toString();
        NewFoodDto newFoodDto = new NewFoodDto(
                "test",
                "testDescription",
                123.23,
                restaurantId,
                FoodCategory.Dessert
        );
        Restaurant restaurantEntity = new Restaurant(restaurantId, "restaurant", "test street", null, null, new ArrayList<>());
        Food newFoodEntity = new Food(foodId,"test","testDescription", 123.23, restaurantEntity, FoodCategory.Dessert);

        Mockito.when(restaurantRepository.findById(Mockito.any())).thenReturn(Optional.of(restaurantEntity));
        Mockito.when(foodRepository.save(Mockito.any())).thenReturn(newFoodEntity);

        FoodDto actual = foodService.addFoodToRestaurant(newFoodDto);
        FoodDto expected = new FoodDto(foodId, "test","testDescription", 123.23, FoodCategory.Dessert.toString());

        assert (actual.getId().equals(expected.getId()));
        assert (actual.getName().equals(expected.getName()));
        assert (actual.getDescription().equals(expected.getDescription()));
        assert (actual.getPrice().equals(expected.getPrice()));
        assert (actual.getCategory().equals(expected.getCategory()));
    }

    @Test
    public void nonexistentRestaurantTest() throws Exception {
        NewFoodDto newFoodDto = new NewFoodDto("test", "test description", 123.12, null, FoodCategory.Dessert);

        Exception exception = assertThrows(Exception.class, () -> foodService.addFoodToRestaurant(newFoodDto));
        String expectedErrorMessage = "Restaurant doesn't exist!";
        assert(exception.getMessage().equals(expectedErrorMessage));

    }
}