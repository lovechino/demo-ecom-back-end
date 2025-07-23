/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post(`GetCart`)
  async findcart(@Req() req){
     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
     const userId = req.user.sub; 
     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
   const accessToken = req.headers.authorization?.split(' ')[1];
   return this.cartService.getcartbyid(userId,accessToken)
  }

  @UseGuards(JwtAuthGuard)
  @Post('Insert')
  async insertCart( @Req() req, @Body() body : {product_id:string,quantity:number}){
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const userId = req.user.sub; 
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const accessToken = req.headers.authorization?.split(' ')[1];
    const{product_id,quantity} = body
    return this.cartService.insertbyuser(userId,product_id,quantity,accessToken)
  }

  @UseGuards(JwtAuthGuard)
  @Post('UpdateQuantity')
  async updateQuantity(@Req() req, @Body() body:{id:string,quantity:number}){
    const{id,quantity} = body
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const accessToken = req.headers.authorization?.split(' ')[1];
    return this.cartService.updateQuantity(id,quantity,accessToken)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('DeleteCart')
  async deleteCart(@Req() req, @Body() body:{id:string}){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const accessToken = req.headers.authorization?.split(' ')[1];
    const{id} = body
    return this.cartService.deleteitem(id,accessToken)
  }
}
