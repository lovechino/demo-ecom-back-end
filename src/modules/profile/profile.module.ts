/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { SupabaseService } from "src/database/supabase.service";
import { ProfileController } from "./profile.controller";

@Module({
    providers:[ProfileService,SupabaseService],
    controllers:[ProfileController]
})
export class ProfileModule{}