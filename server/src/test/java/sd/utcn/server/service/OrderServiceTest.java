package sd.utcn.server.service;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import sd.utcn.server.dto.FoodDto;
import sd.utcn.server.dto.NewOrderDto;
import sd.utcn.server.dto.NewOrderedFoodDto;
import sd.utcn.server.dto.OrderedFoodDto;
import sd.utcn.server.model.*;
import sd.utcn.server.model.state.FoodCategory;
import sd.utcn.server.model.state.State;
import sd.utcn.server.repository.CustomerRepository;
import sd.utcn.server.repository.FoodRepository;
import sd.utcn.server.repository.OrderRepository;
import sd.utcn.server.repository.RestaurantRepository;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class OrderServiceTest {

    @MockBean
    private final OrderRepository orderRepository;
    @MockBean
    private final RestaurantRepository restaurantRepository;
    @MockBean
    private final FoodRepository foodRepository;
    @MockBean
    private final CustomerRepository customerRepository;

    private final OrderService orderService;

    @Autowired
    public OrderServiceTest(OrderRepository orderRepository, RestaurantRepository restaurantRepository, FoodRepository foodRepository,
                            CustomerRepository customerRepository, OrderService orderService){
        this.orderRepository = orderRepository;
        this.restaurantRepository = restaurantRepository;
        this.foodRepository = foodRepository;
        this.customerRepository = customerRepository;
        this.orderService = orderService;

    }

    @Test
    public void addOrderTest() {
        String customerId = UUID.randomUUID().toString();
        String foodId = UUID.randomUUID().toString();
        String restaurantId = UUID.randomUUID().toString();
        String orderId = UUID.randomUUID().toString();

        Customer customer = new Customer(customerId, "test@email.com", "123", new ArrayList<>());
        Restaurant restaurant = new Restaurant(restaurantId, "test", "street test", null, new ArrayList<>(), new ArrayList<>());
        Food food = new Food(foodId, "food", "food description", 123.12,restaurant, FoodCategory.Dessert);

        ArrayList<NewOrderedFoodDto> orderedFoodDtoList = new ArrayList<>();
        NewOrderedFoodDto newOrderedFoodDto = new NewOrderedFoodDto(foodId, 1);
        orderedFoodDtoList.add(newOrderedFoodDto);

        NewOrderDto newOrderDto = new NewOrderDto(customerId, orderedFoodDtoList, restaurantId);
        Order order = new Order();
        order.setId(orderId);
        order.setCustomer(customer);
        order.setRestaurant(restaurant);
        ArrayList<OrderedFood> orderedFoodList = new ArrayList<>();
        orderedFoodList.add(new OrderedFood(food, 1, order));
        order.setOrderedFoods(orderedFoodList);

        Mockito.when(customerRepository.findById(Mockito.anyString())).thenReturn(Optional.of(customer));
        Mockito.when(restaurantRepository.findById(Mockito.anyString())).thenReturn(Optional.of(restaurant));
        Mockito.when(foodRepository.findById(Mockito.anyString())).thenReturn(Optional.of(food));
        Mockito.when(orderRepository.save(Mockito.any())).thenReturn(order);

        assertDoesNotThrow(() -> orderService.addOrder(newOrderDto));

    }

    @Test
    public void emptyOrderedList() {
        String customerId = UUID.randomUUID().toString();
        String foodId = UUID.randomUUID().toString();
        String restaurantId = UUID.randomUUID().toString();
        String orderId = UUID.randomUUID().toString();

        Customer customer = new Customer(customerId, "test@email.com", "123", new ArrayList<>());
        Restaurant restaurant = new Restaurant(restaurantId, "test", "street test", null, new ArrayList<>(), new ArrayList<>());
        ArrayList<NewOrderedFoodDto> orderedFoodDtoList = new ArrayList<>();
        NewOrderedFoodDto newOrderedFoodDto = new NewOrderedFoodDto(foodId, 1);
        orderedFoodDtoList.add(newOrderedFoodDto);

        NewOrderDto newOrderDto = new NewOrderDto(customerId, orderedFoodDtoList, restaurantId);
        Order order = new Order();
        order.setId(orderId);
        order.setCustomer(customer);
        order.setRestaurant(restaurant);
        ArrayList<OrderedFood> orderedFoodList = new ArrayList<>();
        order.setOrderedFoods(orderedFoodList);

        Mockito.when(customerRepository.findById(Mockito.anyString())).thenReturn(Optional.of(customer));
        Mockito.when(restaurantRepository.findById(Mockito.anyString())).thenReturn(Optional.of(restaurant));
        Mockito.when(orderRepository.save(Mockito.any())).thenReturn(order);

        String errorMessage = "Invalid food id!";
        Exception exception = assertThrows(Exception.class, () -> orderService.addOrder(newOrderDto));
        assert(exception.getMessage().equals(errorMessage));
    }


}