/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post(`GetCart/:id`)
  async findcart(@Param('id') id: string){
    return this.cartService.getcartbyid(id)
  }
  @Post('Insert/:id')
  async insertCart(@Param('id') id : string, @Body() body : {product_id:string,quantity:number}){
    const{product_id,quantity} = body
    return this.cartService.insertbyuser(id,product_id,quantity)
  }
  @Delete('DeleteCart')
  async deleteCart(@Body() body:{id:string}){
    const{id} = body
    return this.cartService.deleteitem(id)
  }
}
