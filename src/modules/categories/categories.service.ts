/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {SupabaseService} from "../../database/supabase.service"
import { CategoryType } from '../../database/supabase.types';


@Injectable({})
export class CategoriesServices{
    constructor(private supabaseService: SupabaseService){}
async findAll() : Promise<CategoryType[]> {
  const supabase = this.supabaseService.getClient();
  const { data, error } : { data: CategoryType[] | null; error: Error | null }  = await supabase.from('categories').select('*');
  if (error) throw new InternalServerErrorException(error.message);
 if (!data) return []; 
 return data;
}
}