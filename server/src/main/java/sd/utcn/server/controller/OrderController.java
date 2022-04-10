package sd.utcn.server.controller;

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

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderDto> placeOrder(@RequestBody NewOrderDto order){
        try{
            var dto = orderService.addOrder(order);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(path = "{orderId}")
    public ResponseEntity<OrderDto> setOrderStatus(@PathVariable("orderId")String id, @RequestBody OrderStatus orderStatus){
        try{
            var dto = orderService.changeOrderStatus(id, orderStatus);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
