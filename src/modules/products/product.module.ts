/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductServices } from "./product.service";
import { SupabaseService } from "src/database/supabase.service";
import { RedisService } from "src/database/redis.service";

@Module({
    controllers : [ProductController],
    providers:[ProductServices,SupabaseService,RedisService]
})
export class ProductModule{}