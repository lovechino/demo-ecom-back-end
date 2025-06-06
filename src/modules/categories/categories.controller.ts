/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { CategoriesServices } from './categories.service';

import { CategoryType } from 'src/database/supabase.types';


@Controller('categories') // --> gọi /categories
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesServices) {}

 
  @Get()
  async findAll(): Promise<CategoryType[]> {
    return this.categoriesService.findAll();
  }
}
