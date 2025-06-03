/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthServices } from "./auth.service";
import { SupabaseService } from "src/database/supabase.service";

@Module({
    controllers:[AuthController],
    providers:[AuthServices,SupabaseService]
})
export class AuthModule {}