/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from 'src/database/supabase.service';


@Injectable()
export class OrderService {
  constructor(private readonly services: SupabaseService) {}
  private supabase(token: string) {
    return this.services.getClientWithUserToken(token);
  }

  async createOrder(
    token:string,
    user_id: string,
    shipping_address: string,
    items: Array<{
      product_id: string;
      quantity: number;
      unit_price: number;
    }>,
  ) {
    // Tính tổng giá tiền
    const total_amount = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data, error } = await this.supabase(token).rpc(
      'create_order_with_items',
      {
        p_user_id: user_id,
        p_shipping_address: shipping_address,
        p_total_amount: total_amount,
        p_items: items
      },
    );
    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data;
    
  }

   async updateStatus(id: string, status: string,token : string) {
const { data, error } = await this.supabase(token)
  .from('orders')
  .update({
    status: status,
  })
  .eq('id', id);
if (error) throw new InternalServerErrorException(error.message);
return data;
}
  async getDetailOrder(id:string,token:string,order_id:string){
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const{data,error} = await this.supabase(token).rpc(
      'select_detail_order',
      {
        p_user_id : id,
        o_order_id:order_id
      }
    )
    if(error){
      throw new InternalServerErrorException(error.message)
    }

    if(!data) return[]
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data
  }
  async getListOrder(id:string,token:string){
     const{data,error} = await this.supabase(token).from('orders').select("*").eq("user_id",id)
     if(error) throw new InternalServerErrorException(error.message)
     if(!data) return[]
     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
     return data
  }
}
