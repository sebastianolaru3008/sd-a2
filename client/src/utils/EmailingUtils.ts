import { EmailDto } from '../models/dto/EmaailDto';
import { Order } from '../models/entities/Order';
import { OrderedFood } from '../models/entities/OrderedFood';

export const getEmailOrderContentMessage = (orderedFoods: OrderedFood[]) => {
    let content = `<blockquote><i><b>PRODUCTS: <br>--------------------<br><br></b>`;
    let total = 0;
    orderedFoods.forEach(e => {
        total += e.quantity * e.food.price;
        content += `${e.food.name} ----- ${e.quantity} X ${e.food.price} RON<br><br>`;
    });
    content += `<b><br>--------------------<br>TOTAL: ${total} RON<br><br></b></i></blockquote>`;
    return content;
};

export const getEmailTemplateObject = (
    customerId: string,
    adminEmail: string,
    restaurantName: string,
    order: Order,
) => {
    console.log(getEmailOrderContentMessage(order.orderedFoods));
    return {
        recipient: adminEmail,
        order_id: order.id,
        restaurant_name: restaurantName,
        customer_id: customerId,
        order_content: getEmailOrderContentMessage(order.orderedFoods),
    } as EmailDto;
};
