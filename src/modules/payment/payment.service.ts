/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import  PayOS  from '@payos/node'; 

@Injectable()
export class PaymentService {
  private payos: PayOS;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    this.payos = new PayOS(
      process.env.PAYOS_CLIENT_ID!,
      process.env.PAYOS_API_KEY!,
      process.env.PAYOS_CHECKSUM_KEY!
    );
  }

  async createPaymentLink(amount: number,name:string,email:string,phone:string) {
      const orderCode = Date.now()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
     const paymentLink = await this.payos.createPaymentLink({
      orderCode,
      amount,
      description: `Thanh toán đơn hàng #${orderCode}`,
      returnUrl: 'https://yourdomain.com/payment-success',
      cancelUrl: 'https://yourdomain.com/payment-cancel',
      buyerName: name,
      buyerEmail: email,
      buyerPhone: phone,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return paymentLink;
  }

  verifyWebhook(payload: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return this.payos.verifyPaymentWebhookData(payload);
  }

  async getPaymentLinkInfo(orderCode: number) {
    return this.payos.getPaymentLinkInformation(orderCode);
  }

  async isOrderPaid(orderCode: number): Promise<boolean> {
  const info = await this.getPaymentLinkInfo(orderCode);
  return info.status === 'PAID'; // true nếu đã thanh toán
}

   async cancelPayment(orderCode: number) {
    return this.payos.cancelPaymentLink(orderCode);
  }
  
}
