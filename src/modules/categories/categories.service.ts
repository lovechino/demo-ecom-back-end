/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {SupabaseService} from "../../database/supabase.service"
import { Database } from '../../database/supabase.types';

type Category = Database['public']['Tables']['categories']['Row'];

@Injectable({})
export class CategoriesServices{
    constructor(private supabaseService: SupabaseService){}
async findAll() : Promise<Category[]> {
  const supabase = this.supabaseService.getClient();
  const { data, error } : { data: Category[] | null; error: Error | null }  = await supabase.from('categories').select('*');
  if (error) throw new InternalServerErrorException(error.message);
 if (!data) return []; 
 return data;
}
}