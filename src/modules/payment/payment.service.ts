/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import PayOS from '@payos/node';

@Injectable()
export class PaymentService {
  private payos: PayOS;

  constructor() {
    const clientId = process.env.PAYOS_CLIENT_ID;
    const apiKey = process.env.PAYOS_API_KEY;
    const checksumKey = process.env.PAYOS_CHECKSUM_KEY;

    if (!clientId || !apiKey || !checksumKey) {
      throw new InternalServerErrorException('Missing PayOS environment variables');
    }

    this.payos = new PayOS(clientId, apiKey, checksumKey);
  }

  async createPaymentLink(amount: number, name: string, email: string, phone: string) {
    const orderCode = Date.now();

    try {
      const paymentLink = await this.payos.createPaymentLink({
        orderCode,
        amount,
        description: `#${orderCode}`,
        returnUrl: process.env.PAYOS_RETURN_URL || 'https://yourdomain.com/payment-success',
        cancelUrl: process.env.PAYOS_CANCEL_URL || 'https://yourdomain.com/payment-cancel',
        buyerName: name,
        buyerEmail: email,
        buyerPhone: phone,
      });

      return paymentLink;
    } catch (error) {
      console.error('Error creating payment link:', error);
      throw new InternalServerErrorException('Không thể tạo link thanh toán');
    }
  }

  verifyWebhook(payload: any) {
    return this.payos.verifyPaymentWebhookData(payload);
  }

  async getPaymentLinkInfo(orderCode: number) {
    try {
      return await this.payos.getPaymentLinkInformation(orderCode);
    } catch (error) {
      console.error('Error fetching payment link info:', error);
      throw new InternalServerErrorException('Không thể lấy thông tin thanh toán');
    }
  }

  async isOrderPaid(orderCode: number): Promise<boolean> {
    const info = await this.getPaymentLinkInfo(orderCode);
    return info.status === 'PAID';
  }

  async cancelPayment(orderCode: number) {
    try {
      return await this.payos.cancelPaymentLink(orderCode);
    } catch (error) {
      console.error('Error canceling payment:', error);
      throw new InternalServerErrorException('Không thể huỷ thanh toán');
    }
  }
}
