package sd.utcn.server.mapper;

import sd.utcn.server.dto.NewOrderDto;
import sd.utcn.server.dto.OrderDto;
import sd.utcn.server.model.Order;
import sd.utcn.server.model.OrderStatus;

public class OrderMapper {

    public static Order toEntity(NewOrderDto newOrder) {
        var o = new Order();
        o.setOrderStatus(OrderStatus.PENDING);
        o.setOrderedFoods(newOrder.getOrderedFoods().stream()
                .map(OrderedFoodMapper::toEntity).toList());
        return o;
    }

    public static OrderDto toDto(Order order){
        var o = new OrderDto();
        o.setId(order.getId());
        o.setOrderStatus(order.getOrderStatus());
        o.setOrderedFoods(order.getOrderedFoods()
                .stream().map(OrderedFoodMapper::toDto).toList());
        return o;
    }
}
