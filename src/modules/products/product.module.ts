/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductServices } from "./product.service";
import { SupabaseService } from "src/database/supabase.service";

@Module({
    controllers : [ProductController],
    providers:[ProductServices,SupabaseService]
})
export class ProductModule{}