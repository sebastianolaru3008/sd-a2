package sd.utcn.server.mapper;

import sd.utcn.server.dto.CustomerDto;
import sd.utcn.server.dto.NewCustomerDto;
import sd.utcn.server.model.Customer;

public class CustomerMapper {
    public static Customer toEntity(NewCustomerDto customerDto) {
        Customer c = new Customer();
        c.setEmail(customerDto.getEmail());
        c.setPasswordHash(customerDto.getPassword());
        return c;
    }

    public static CustomerDto toDto(Customer customer) {
        var c = new CustomerDto();
        c.setEmail(customer.getEmail());
        c.setId(customer.getId());
        if (customer.getOrders() != null)
            c.setOrders(customer.getOrders().stream().map(OrderMapper::toDto).toList());
        return c;
    }
}
