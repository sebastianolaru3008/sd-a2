package sd.utcn.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sd.utcn.server.dto.NewOrderDto;
import sd.utcn.server.dto.OrderDto;
import sd.utcn.server.mapper.OrderMapper;
import sd.utcn.server.model.Order;
import sd.utcn.server.model.OrderStatus;
import sd.utcn.server.model.OrderedFood;
import sd.utcn.server.repository.CustomerRepository;
import sd.utcn.server.repository.FoodRepository;
import sd.utcn.server.repository.OrderRepository;
import sd.utcn.server.repository.RestaurantRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final RestaurantRepository restaurantRepository;
    private final FoodRepository foodRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, RestaurantRepository restaurantRepository, FoodRepository foodRepository, CustomerRepository customerRepository) {
        this.orderRepository = orderRepository;
        this.restaurantRepository = restaurantRepository;
        this.foodRepository = foodRepository;
        this.customerRepository = customerRepository;
    }

    /**
     * Adds a new order for a given restaurant to the current database.
     * @param newOrder
     * @return
     * @throws Exception
     */
    @Transactional
    public OrderDto addOrder(NewOrderDto newOrder) throws Exception {
        var customer = customerRepository.findById(newOrder.getCustomerId());
        if (customer.isEmpty()) throw new Exception("Customer doesn't exist");

        var restaurant = restaurantRepository.findById(newOrder.getRestaurantId());
        if (restaurant.isEmpty()) throw new Exception("Restaurant doesn't exist");

        var order = new Order();
        order.setCustomer(customer.get());
        order.setRestaurant(restaurant.get());
        List<OrderedFood> foods = new ArrayList<>();
        for (var f : newOrder.getOrderedFoods()) {
            var food = foodRepository.findById(f.getFoodId());
            if (food.isEmpty()) throw new Exception("Invalid food id!");
            if (!Objects.equals(food.get().getRestaurant().getId(), restaurant.get().getId()))
                throw new Exception("Food is not from the right restaurant");
            foods.add(new OrderedFood(food.get(), f.getQuantity(), order));
        }
        customer.get().addOrder(order);
        restaurant.get().addOrder(order);
        order.setOrderedFoods(foods);
        var added = orderRepository.save(order);
        return OrderMapper.toDto(added);
    }

    /**
     * Changes the order status to 'orderStatus' for the order with the 'id'.
     * @param id
     * @param orderStatus
     * @return
     * @throws Exception
     */
    @Transactional
    public OrderDto changeOrderStatus(String id, OrderStatus orderStatus) throws Exception {
        var o = orderRepository.findById(id);
        if (o.isEmpty()) throw new Exception("Nonexistent order");

        System.out.println(orderStatus.getValue());
        System.out.println(o.get().getOrderStatus().getValue());

        if(orderStatus.getValue() - o.get().getOrderStatus().getValue() == 1){
            o.get().advanceStatus();
            System.out.println(o.get().getOrderStatus());
        }
        if(orderStatus.getValue() - o.get().getOrderStatus().getValue() == 4)
            o.get().declineOrder();



        return OrderMapper.toDto(o.get());
    }
}
