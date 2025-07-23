/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from 'src/database/supabase.service';
import { CartItemsType } from 'src/database/supabase.types';

@Injectable()
export class CartService {
    constructor(private readonly services : SupabaseService){}
    private supabase(token : string){
        return this.services.getClientWithUserToken(token)
    }
    async getcartbyid(id : string,token : string){
        const{data,error} = await this.supabase(token).from('cart_items').select("*").eq('user_id',id)
        if(error) throw new InternalServerErrorException(error.message)
        if(!data) return[]
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data
    }
    async insertbyuser(
        id: string,
        product_id: string,
        quantity: number,
        token: string
    ): Promise<CartItemsType | null> {
        const { data: existingItem, error: findError } = await this.supabase(token)
            .from('cart_items')
            .select('*')
            .eq('user_id', id)
            .eq('product_id', product_id)
            .maybeSingle<{
                id: string;
                user_id: string;
                product_id: string;
                quantity: number;
            }>();

        if (findError) throw new InternalServerErrorException(findError.message);

        if (existingItem && typeof existingItem.quantity === 'number' && existingItem.id) {
            const newQuantity = existingItem.quantity + quantity;
            const { data, error } = await this.supabase(token)
                .from('cart_items')
                .update({ quantity: newQuantity })
                .eq('id', existingItem.id)
                .select();
            if (error) throw new InternalServerErrorException(error.message);
            const updated: CartItemsType[] | null = data as CartItemsType[] | null;
            return updated && updated.length > 0 ? updated[0] : null;
        } else {
            const { data, error } = await this.supabase(token)
                .from('cart_items')
                .insert({
                    user_id: id,
                    product_id: product_id,
                    quantity: quantity
                })
                .select();
            if (error) throw new InternalServerErrorException(error.message);
            const inserted: CartItemsType[] | null = data as CartItemsType[] | null;
            return inserted && inserted.length > 0 ? inserted[0] : null;
        }
    }
    async updateQuantity(id: string, quantity: number, token: string): Promise<CartItemsType | null> {
        const { data, error } = await this.supabase(token)
            .from('cart_items')
            .update({ quantity })
            .eq('id', id)
            .select();
        if (error) throw new InternalServerErrorException(error.message);
        const updated: CartItemsType[] | null = data as CartItemsType[] | null;
        return updated && updated.length > 0 ? updated[0] : null;
    }
    async deleteitem(id : string,token : string){
        const{data,error} = await this.supabase(token).from('cart_items').delete().eq('id',id)
        if(error) throw new InternalServerErrorException(error.message)
        return data
    }
}
