/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from 'src/database/supabase.service';

@Injectable()
export class OrderService {
  constructor(private readonly services: SupabaseService) {}
  private createClient() {
    return this.services.getClient();
  }

  async updateAddress(id: string, address: string) {
    const { data, error } = await this.createClient()
      .from('orders')
      .update({
        shipping_address: address,
      })
      .eq('id', id);
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async updateStatus(id: string, status: string) {
    const { data, error } = await this.createClient()
      .from('orders')
      .update({
        status: status,
      })
      .eq('id', id);
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async updateAmount(id: string, amount: number) {
    const { data, error } = await this.createClient()
      .from('orders')
      .update({
        total_amount: amount,
      })
      .eq('id', id);
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }
}
