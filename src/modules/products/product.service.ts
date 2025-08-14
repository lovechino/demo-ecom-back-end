/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { RedisService } from "src/database/redis.service";
import { SupabaseService } from "src/database/supabase.service";
import {  ProductType } from "src/database/supabase.types";



@Injectable()
export class ProductServices{
    constructor(private readonly services : SupabaseService
      ,private readonly redisService: RedisService
    ){}
     async findAll(): Promise<ProductType[]> {
    const cacheKey = 'products:all';

    // 1. Lấy từ Redis
    const cachedData = await this.redisService.get(cacheKey);
    if (cachedData) {
      console.log('📦 Lấy dữ liệu từ Redis');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return JSON.parse(cachedData);
    }

    // 2. Query từ Supabase
    const supabase = this.services.getClient();
    const { data, error }: { data: ProductType[] | null; error: Error | null } =
      await supabase.from('productbycategory').select('*');

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (!data) return [];

    // 3. Lưu vào Redis (ví dụ cache 300 giây = 5 phút)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await this.redisService.set(cacheKey, JSON.stringify(data));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await this.redisService.client.expire(cacheKey, 300);

    console.log('💾 Lưu dữ liệu vào Redis');

    return data;
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
    async getProductById(id: string) : Promise<ProductType[]>{
        const supabase = this.services.getClient()
        const{data,error} : { data: ProductType[] | null; error: Error | null } = await supabase.from("productbycategory").select("*").eq("id",id)
        if(error) throw new InternalServerErrorException(error.message)
        if(!data) return[]
        return data
    }
}