package sd.utcn.server.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import sd.utcn.server.model.state.*;

import javax.persistence.*;
import java.util.List;

import static javax.persistence.GenerationType.SEQUENCE;

@Table
@Entity(name = "orders")
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(
            name = "id"
    )
    private String id;
    private OrderStatus orderStatus;

    @Transient
    private State state;

    public void advanceStatus() {
        state.advanceOrder();
    }

    public void declineOrder() {
        state.declineOrder();
    }
    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
        state = switch (orderStatus) {
            case PENDING -> new PendingState(this);
            case ACCEPTED -> new AcceptedState(this);
            case DECLINED -> new DeclinedState(this);
            case IN_DELIVERY -> new InDeliveryState(this);
            default -> new DeliveredState(this);
        };
    }

    public Order() {
        orderStatus = OrderStatus.PENDING;
        state = new PendingState(this);
    }

    @ManyToOne
    private Customer customer;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    private List<OrderedFood> orderedFoods;

    @ManyToOne
    private Restaurant restaurant;
}
