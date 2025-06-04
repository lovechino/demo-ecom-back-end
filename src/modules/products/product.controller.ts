/* eslint-disable prettier/prettier */
import { Controller, Post } from "@nestjs/common";
import { ProductServices } from "./product.service";
import { ProductType } from "src/database/supabase.types";




@Controller("product")
export class ProductController{
    constructor(private readonly services : ProductServices){}

    @Post("GetAllProduct")
    async GetAllProduct() : Promise<ProductType[]> {
        return this.services.findAll()
    }

}