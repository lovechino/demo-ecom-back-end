/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { SupabaseService } from "src/database/supabase.service";

@Injectable({})
export class AuthServices {
    constructor(private services : SupabaseService){
        
    }
    async SignUp(email : string,password: string){
        return this.services.getClient().auth.signUp({email,password})
    }
    async SingIn(email:string,password:string){
        return this.services.getClient().auth.signInWithPassword({email,password})
    }
    async GetUser(accessToken: string){
        const{data,error} = await this.services.getClient().auth.getUser(accessToken)
         if (error) throw error;
         return data.user;
    }
}