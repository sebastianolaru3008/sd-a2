package sd.utcn.server.model.state;

import sd.utcn.server.model.Order;
import sd.utcn.server.model.OrderStatus;

public class PendingState extends State{
    public PendingState(Order order) {
        super(order);
    }

    @Override
    public void pushOrder() {
        this.order.setOrderStatus(OrderStatus.ACCEPTED);
    }

    @Override
    public void denyOrder() {
        this.order.setOrderStatus(OrderStatus.DECLINED);
    }
}
