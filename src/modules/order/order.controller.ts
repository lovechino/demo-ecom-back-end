/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';
import { Request } from 'express';

// Interface cho user lấy từ JWT
interface JwtUser {
  sub: string;
  // ... có thể có các trường khác
}

declare module 'express' {
  interface Request {
    user?: JwtUser;
  }
}

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createOrder(
    @Body() body: { shipping_address: string; items: Array<{ product_id: string; quantity: number; unit_price: number }> },
    @Req() req: Request
  ) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new Error('Unauthorized: userId missing');
    }
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.replace('Bearer ', '');
    const { shipping_address, items } = body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.orderService.createOrder(token, userId, shipping_address, items);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-list')
  async getListOrder(
    @Req() req:Request
  ){
    const userId = req.user?.sub;
    if(!userId){
      throw new Error('Unauthorized: userId missing');
    }
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.replace('Bearer ', '');

    return this.orderService.getListOrder(userId,token)
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-detail')
  async getDetailOrder(
    @Req() req:Request,
    @Body() body:{order_id:string}
  ){
    const userId = req.user?.sub;
    if(!userId){
      throw new Error('Unauthorized: userId missing');
    }
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.replace('Bearer ', '');
    const{order_id} = body

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.orderService.getDetailOrder(userId,token,order_id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('update-order')
  async updateOrder(
    @Req() req:Request,
    @Body() body:{status:string}
  ){
    const userId = req.user?.sub;
    if(!userId){
      throw new Error('Unauthorized: userId missing');
    }
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.replace('Bearer ', '');
    const{status} = body

    return this.orderService.updateStatus(userId,status,token)
  }
}
