/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from 'src/database/supabase.service';

@Injectable()
export class CartService {
    constructor(private readonly services : SupabaseService){}
    async getcartbyid(id : string){
        const supabase = this.services.getClient();
        const{data,error} = await supabase.from('cart_items').select("*").eq('user_id',id)
        if(error) throw new InternalServerErrorException(error.message)
        if(!data) return[]
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data
    }
    async insertbyuser(id : string){
        const supabase = this.services.getClient()
        const
    }
}
