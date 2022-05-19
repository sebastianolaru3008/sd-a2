package sd.utcn.server.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import sd.utcn.server.dto.CustomerDto;
import sd.utcn.server.dto.NewCustomerDto;
import sd.utcn.server.mapper.CustomerMapper;
import sd.utcn.server.repository.CustomerRepository;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();


    @Autowired
    public CustomerService(CustomerRepository _repository) {
        this.customerRepository = _repository;
    }

    /**
     * This is an utility function that checks whether the input string is a valid email or not.
     * @param str
     * @return true if the string mathes and false if it doesn't
     */
    private boolean isValidEmail(String str) {
        return str.matches("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$");
    }

    /**
     * This method is trying to add a new customer to the current database.
     * @param newCustomer
     * @return the customer that was added
     * @throws Exception
     */
    public CustomerDto addCustomer(NewCustomerDto newCustomer) throws Exception {
        if (newCustomer.getEmail().isEmpty() ||
                newCustomer.getPassword().isEmpty() ||
                !isValidEmail(newCustomer.getEmail())) {
            throw new Exception("Invalid user data");
        }
        if (customerRepository.findCustomerByEmail(newCustomer.getEmail()).isPresent()) {
            throw new Exception("There is already an account with this email");
        }
        var entity = CustomerMapper.toEntity(newCustomer);
        entity.setPassword(bCryptPasswordEncoder.encode(entity.getPassword()));
        var a = customerRepository.save(entity);
        return CustomerMapper.toDto(a);
    }

    public static void main(String[] args) {
        System.out.println(BCrypt.hashpw("123123", BCrypt.gensalt()));
    }
}
