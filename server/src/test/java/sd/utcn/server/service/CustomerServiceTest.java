package sd.utcn.server.service;

import org.junit.jupiter.api.Test;
import org.mindrot.jbcrypt.BCrypt;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import sd.utcn.server.dto.CustomerDto;
import sd.utcn.server.dto.NewCustomerDto;
import sd.utcn.server.model.Customer;
import sd.utcn.server.repository.CustomerRepository;
import sd.utcn.server.service.CustomerService;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class CustomerServiceTest {

    @MockBean
    private final CustomerRepository customerRepository;

    private final CustomerService customerService;

    @Autowired
    public CustomerServiceTest(CustomerRepository customerRepository, CustomerService customerService) {
        this.customerRepository = customerRepository;
        this.customerService = customerService;
    }

    @Test
    public void addValidCustomerTest() throws Exception {

        String generatedUUID = UUID.randomUUID().toString();
        NewCustomerDto customerDto = new NewCustomerDto("test@email.com", "123");
        Customer customerEntity = new Customer(generatedUUID, "test@email.com", BCrypt.hashpw("123", BCrypt.gensalt()), null);
        Mockito.when(customerRepository.findCustomerByEmail(Mockito.anyString())).thenReturn(Optional.empty());
        Mockito.when(customerRepository.save(Mockito.any())).thenReturn(customerEntity);

        CustomerDto actual = customerService.addCustomer(customerDto);
        CustomerDto expected = new CustomerDto(generatedUUID, "test@email.com", null);

        assert (!actual.getIsAdmin());
        assert (actual.getOrders() == null);
        assert (actual.getEmail().equals(expected.getEmail()));
    }

    @Test
    public void addExistentCustomerTest() throws Exception {
        String generatedUUID = UUID.randomUUID().toString();
        NewCustomerDto customerDto = new NewCustomerDto("test@email.com", "123");
        Customer customerEntity = new Customer(generatedUUID, "test@email.com", BCrypt.hashpw("123", BCrypt.gensalt()), null);
        Mockito.when(customerRepository.findCustomerByEmail(Mockito.anyString())).thenReturn(Optional.of(customerEntity));

        String expectedErrorMessage = "There is already an account with this email";
        Exception exception = assertThrows(Exception.class, () -> customerService.addCustomer(customerDto));
        assert(exception.getMessage().equals(expectedErrorMessage));

    }

    @Test
    public void invalidCredentialsTest() {
        NewCustomerDto customerDto1 = new NewCustomerDto("testemail.com", "123");
        NewCustomerDto customerDto2 = new NewCustomerDto("", "123");
        NewCustomerDto customerDto3 = new NewCustomerDto("test@email.com", "");

        String expectedErrorMessage = "Invalid user data";
        Exception exception1 = assertThrows(Exception.class, () -> customerService.addCustomer(customerDto1));
        Exception exception2 = assertThrows(Exception.class, () -> customerService.addCustomer(customerDto2));
        Exception exception3 = assertThrows(Exception.class, () -> customerService.addCustomer(customerDto3));

        assert(exception1.getMessage().equals(expectedErrorMessage));
        assert(exception2.getMessage().equals(expectedErrorMessage));
        assert(exception3.getMessage().equals(expectedErrorMessage));
    }



}