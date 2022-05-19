package sd.utcn.server.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Table
@Entity
@Getter
@Setter
public class Customer extends User {
    @OneToMany
    List<Order> orders;

    public void addOrder(Order o){
        orders.add(o);
    }

    @Builder
    public Customer(String uuid, String email, String passwordHash, List<Order> orders) {
        super(email, passwordHash);
        this.orders = orders;
    }
}
