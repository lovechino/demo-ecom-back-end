/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoriesServices } from './categories.service';
import { Database } from '../../database/supabase.types';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';

type Category = Database['public']['Tables']['categories']['Row'];

@Controller('categories') // --> gọi /categories
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesServices) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }
}
