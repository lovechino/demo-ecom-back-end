/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoriesServices } from './categories.service';

import { JwtAuthGuard } from '../Auth/jwt-auth.guard';
import { CategoryType } from 'src/database/supabase.types';



@Controller('categories') // --> gọi /categories
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesServices) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<CategoryType[]> {
    return this.categoriesService.findAll();
  }
}
