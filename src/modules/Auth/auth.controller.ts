/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { AuthServices } from "./auth.service";

@Controller("auth")
export class AuthController{
    constructor(private readonly authServices : AuthServices){}
    @Post('signup')
    async signUp(@Body() body: { email: string; password: string }){
        const { email, password } = body;
        const{data,error} = await this.authServices.SignUp(email,password)
        if (error) {
      throw new UnauthorizedException(error.message);
    }
    return data;
    }

     @Post('signin')
    async signIn(@Body() body:{email:string,password:string}) {
        const { email, password } = body;
        return await this.authServices.SingIn(email, password);
    }
    
    @Post('forgotpassword')
    async forgotPassword(@Body() body:{email:string}){
        const{email} = body
        const{data,error} = await this.authServices.ForgotPassword(email)
        if(error) throw new UnauthorizedException(error.message)
        return data
    }
    @Post('refresh')
    async refresh(@Body("refresh_token") refreshtoken : string){
        const responsive = await this.authServices.RefreshToken(refreshtoken)
        return responsive
    }
}