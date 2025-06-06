/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SupabaseService } from 'src/database/supabase.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService,SupabaseService],
})
export class OrderModule {}
