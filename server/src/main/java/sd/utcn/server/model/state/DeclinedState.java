package sd.utcn.server.model.state;

import sd.utcn.server.model.Order;

public class DeclinedState extends State{
    public DeclinedState(Order order) {
        super(order);
    }

    @Override
    public void pushOrder() {

    }

    @Override
    public void denyOrder() {

    }
}
