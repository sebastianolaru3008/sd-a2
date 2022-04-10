package sd.utcn.server.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

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
}
