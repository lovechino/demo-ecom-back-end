/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { SupabaseService } from "src/database/supabase.service";

@Injectable()
export class OrderHelper{
    constructor(private readonly services : SupabaseService){}
    private createClient(token:string){
        return this.services.getClientWithUserToken(token)
    }
     async createOrder(
        token:string,
        user_id: string,
        orderCode: number,
        shipping_address: string,
        total_amount: number,
        items: Array<{
          product_id: string;
          quantity: number;
          unit_price: number;
        }>,
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { data, error } = await this.createClient(token).rpc(
          'create_order_with_items',
          {
            p_user_id: user_id,
            p_shipping_address: shipping_address,
            p_total_amount: total_amount,
            p_items: items, // hoặc JSON.parse(JSON.stringify(items)) để đảm bảo JSONB
          },
        );
        if (error) {
          throw new InternalServerErrorException(error.message);
        }
    
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data;
      }

       async updateStatus(id: string, status: string,token : string) {
    const { data, error } = await this.createClient(token)
      .from('orders')
      .update({
        status: status,
      })
      .eq('id', id);
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }
}