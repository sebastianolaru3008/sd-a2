import emailjs from '@emailjs/browser';
import { config } from '../config/Config';

export const sendOrderEmail = async (data: any) => {
    try {
        const response = await emailjs.send(
            config.EMAILING.SERVICE_ID,
            config.EMAILING.TEMPLATE_ID,
            data,
            config.EMAILING.PK,
        );
        console.log('SUCCESS!', response.status, response.text);
    } catch (error) {
        console.log('FAILED...', error);
    }
};
