/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from "@nestjs/common";
import { ProductServices } from "./product.service";
import { ProductType } from "src/database/supabase.types";




@Controller("product")
export class ProductController{
    constructor(private readonly services : ProductServices){}

    @Post("GetAllProduct")
    async GetAllProduct() : Promise<ProductType[]> {
        return this.services.findAll()
    }

    @Post("GetProductByCategoryId")
    async GetProductByCategoryId(@Body() body: { category_id: string }) : Promise<ProductType[]> {
        return this.services.getProductByCategoryId(body.category_id)
    }

    @Post("GetProductById")
    async GetProductById(@Body() body: { id: string }) : Promise<ProductType[]> {
        return this.services.getProductById(body.id)
    }

}