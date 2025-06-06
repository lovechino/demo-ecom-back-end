/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Response } from 'express';
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post('create')
  async createLink(@Body() body: { amount: number,name:string,email:string,phone:string }){
    const{amount,name,email,phone} = body
    return this.paymentService.createPaymentLink(amount,name,email,phone)
  }

   @Post('webhook')
  handleWebhook(@Body() payload: any, @Res() res: Response) {
    const isValid = this.paymentService.verifyWebhook(payload);
    if (!isValid) { 
         return res.status(400).json({ message: 'Invalid checksum' });
     }
    return res.status(200).json({ received: true });
  }

}
