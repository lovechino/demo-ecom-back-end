/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from 'src/database/supabase.service';

@Injectable()
export class CartService {
    constructor(private readonly services : SupabaseService){}
    private supabase(){
        return this.services.getClient()
    }
    async getcartbyid(id : string){
        const{data,error} = await this.supabase().from('cart_items').select("*").eq('user_id',id)
        if(error) throw new InternalServerErrorException(error.message)
        if(!data) return[]
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data
    }
    async insertbyuser(id : string,product_id : string,quantity:number){
        const {data,error} = await this.supabase().from('cart_items').insert({
            user_id : id,
            product_id : product_id,
            quantity:quantity
        })
        if(error) throw new InternalServerErrorException(error.message)
        if(!data) return[]
        return data
    }
    async deleteitem(id : string){
        const{data,error} = await this.supabase().from('cart_items').delete().eq('id',id)
        if(error) throw new InternalServerErrorException(error.message)
        return data
    }
}
