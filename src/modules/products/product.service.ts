/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { SupabaseService } from "src/database/supabase.service";
import {  ProductType } from "src/database/supabase.types";



@Injectable()
export class ProductServices{
    constructor(private readonly services : SupabaseService){}
    async findAll() : Promise<ProductType[]>{
        const supabase = this.services.getClient();
        const{data,error} : { data: ProductType[] | null; error: Error | null } = await supabase.from("productbycategory").select("*")
        if(error) throw new InternalServerErrorException(error.message)
        if(!data) return[]
        return data
    }

    async sortProduct(rise: boolean) : Promise<ProductType[]>{
        const supabase = this.services.getClient()
        const{data,error} : { data: ProductType[] | null; error: Error | null } = await supabase.from("productbycategory").select("*").order(`price`,{ascending : rise})
        if(error) throw new InternalServerErrorException(error.message)
        if(!data) return[]
        return data
    }

    async getProductByCategoryId(id: string) : Promise<ProductType[]>{
        const supabase = this.services.getClient()
        const{data,error} : { data: ProductType[] | null; error: Error | null } = await supabase.from("productbycategory").select("*").eq("category_id",id)
        if(error) throw new InternalServerErrorException(error.message)
        if(!data) return[]
        return data
    }
}