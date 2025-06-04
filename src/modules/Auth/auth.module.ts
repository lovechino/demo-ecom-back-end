/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthServices } from "./auth.service";
import { SupabaseService } from "src/database/supabase.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    controllers:[AuthController],
    providers:[AuthServices,SupabaseService,JwtStrategy],
    imports:[
        PassportModule,
        JwtModule.register({})
    ],
    exports:[]
})
export class AuthModule {}