/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { SupabaseService } from "src/database/supabase.service";

@Injectable()
export class ProfileService{
    constructor(private readonly services : SupabaseService){}
    private get_table(token){
        return this.services.getClientWithUserToken(token).from('profiles');
    }

    async getProfile(accessToken:string){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const{data,error} = await this.get_table(accessToken).select('*').single()
        if(error) throw new InternalServerErrorException(error.message)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data
    }

    async insertProfile(id:string,fullname:string,phone:string,address:string,accessToken:string){
        const{data,error} = await this.services.getClientWithUserToken(accessToken).from('profiles').insert({
            id:id,
            full_name : fullname,
            phone : phone,
            address : address
        })
        if(error) throw new InternalServerErrorException(error.message)
        return data
    }

    async updateProfile(id:string,fullname:string,phone:string,address:string,accessToken:string){
        const{data,error} = await this.get_table(accessToken).update({
            full_name : fullname,
            phone : phone,
            address : address
        }).eq('id',id)
        if(error) throw new InternalServerErrorException(error.message)
        return data
    }
}