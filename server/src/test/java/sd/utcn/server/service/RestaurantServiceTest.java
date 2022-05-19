package sd.utcn.server.service;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import sd.utcn.server.dto.NewRestaurantDto;
import sd.utcn.server.model.Admin;
import sd.utcn.server.model.Restaurant;
import sd.utcn.server.repository.AdminRepository;
import sd.utcn.server.repository.RestaurantRepository;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@SpringBootTest
public class RestaurantServiceTest {

    @MockBean
    private final RestaurantRepository restaurantRepository;
    @MockBean
    private final AdminRepository adminRepository;
    private final RestaurantService restaurantService;

    @Autowired
    public RestaurantServiceTest(RestaurantRepository restaurantRepository, AdminRepository adminRepository, RestaurantService restaurantService) {
        this.restaurantRepository = restaurantRepository;
        this.adminRepository = adminRepository;
        this.restaurantService = restaurantService;
    }

    @Test
    public void addRestaurantTest() {

        String adminId = UUID.randomUUID().toString();
        String restaurantId = UUID.randomUUID().toString();

        Admin adminEntity = new Admin(adminId, new ArrayList<>());
        NewRestaurantDto newRestaurantDto = new NewRestaurantDto("restaurant", "test location", adminId);
        Restaurant restaurant = new Restaurant(restaurantId, "restaurant", "test location", adminEntity,  new ArrayList<>(),  new ArrayList<>());

        Mockito.when(adminRepository.findById(Mockito.anyString())).thenReturn(Optional.of(adminEntity));
        Mockito.when(restaurantRepository.save(Mockito.any())).thenReturn(restaurant);

        assertDoesNotThrow(() -> restaurantService.add(newRestaurantDto));
    }


}