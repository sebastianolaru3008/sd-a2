package sd.utcn.server.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Table
@Entity
@Getter
@Setter
@NoArgsConstructor
public class OrderedFood {
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

    @ManyToOne
    private Food food;

    private Integer quantity;

    @ManyToOne
    private Order order;

    public OrderedFood(Food food, Integer quantity, Order order) {
        this.food = food;
        this.quantity = quantity;
        this.order = order;
    }
}
