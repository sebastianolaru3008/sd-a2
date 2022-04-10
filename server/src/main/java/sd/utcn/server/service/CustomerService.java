package sd.utcn.server.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sd.utcn.server.dto.CustomerDto;
import sd.utcn.server.dto.NewCustomerDto;
import sd.utcn.server.mapper.CustomerMapper;
import sd.utcn.server.repository.CustomerRepository;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository _repository) {
        this.customerRepository = _repository;
    }

    private boolean isValidEmail(String str) {
        return str.matches("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$");
    }

    public CustomerDto addCustomer(NewCustomerDto newCustomer) throws Exception {
        if (newCustomer.getEmail().isEmpty() ||
                newCustomer.getPassword().isEmpty() ||
                !isValidEmail(newCustomer.getEmail())) {
            throw new Exception("Invalid user data");
        }
        if (customerRepository.findCustomerByEmail(newCustomer.getEmail()).isPresent()) {
            throw new Exception("Email taken");
        }
        var entity = CustomerMapper.toEntity(newCustomer);
        entity.setPasswordHash(BCrypt.hashpw(entity.getPasswordHash(), BCrypt.gensalt()));
        var a = customerRepository.save(entity);
        return CustomerMapper.toDto(a);
    }

    public static void main(String[] args) {
        System.out.println(BCrypt.hashpw("123123", BCrypt.gensalt()));
    }
}
