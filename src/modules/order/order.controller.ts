/* eslint-disable prettier/prettier */
import { Body, Controller } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }
}
