package sd.utcn.server.model.state;

import sd.utcn.server.model.Order;
import sd.utcn.server.model.OrderStatus;

public class InDeliveryState extends State{
    public InDeliveryState(Order order) {
        super(order);
    }

    @Override
    public void pushOrder() {
        this.order.setOrderStatus(OrderStatus.DELIVERED);
    }

    @Override
    public void denyOrder() {

    }
}
