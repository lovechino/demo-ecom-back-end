/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CategoriesServices } from './categories.service';
import { CategoriesController } from './categories.controller';
import { SupabaseService } from '../../database/supabase.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesServices, SupabaseService],
})
export class CategoriesModule {}
