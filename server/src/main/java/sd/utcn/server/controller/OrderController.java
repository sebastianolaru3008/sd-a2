package sd.utcn.server.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sd.utcn.server.dto.NewOrderDto;
import sd.utcn.server.dto.OrderDto;
import sd.utcn.server.model.OrderStatus;
import sd.utcn.server.service.OrderService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/order")
public class OrderController {
    private final OrderService orderService;
    private Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    public OrderController(OrderService service) {
        this.orderService = service;
    }

    @PostMapping
    public ResponseEntity<OrderDto> placeOrder(@RequestBody NewOrderDto order){
        try{
            var dto = orderService.addOrder(order);
            logger.info("An order was placed.");
            return new ResponseEntity<>(dto, HttpStatus.OK);
        }catch(Exception e){
            logger.error("Error placing an order!");
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(path = "{orderId}")
    public ResponseEntity<OrderDto> setOrderStatus(@PathVariable("orderId")String id, @RequestBody OrderStatus orderStatus){
        try{
            var dto = orderService.changeOrderStatus(id, orderStatus);
            logger.info("Order status changed.");
            return new ResponseEntity<>(dto, HttpStatus.OK);
        }catch(Exception e){
            logger.error("Error changing an order status!");
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
