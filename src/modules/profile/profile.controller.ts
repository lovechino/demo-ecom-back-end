/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly services: ProfileService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const accessToken = req.headers.authorization?.split(' ')[1];
    return this.services.getProfile(accessToken);
  }

  @Post('insert')
  @UseGuards(JwtAuthGuard)
  async insertProfile(
    @Body() body: { fullname: string; phone: string; address: string },
    @Req() req,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const userId = req.user.sub; // user id từ JWT payload
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const accessToken = req.headers.authorization?.split(' ')[1];
    return this.services.insertProfile(
      userId,
      body.fullname,
      body.phone,
      body.address,
      accessToken,
    );
  }

  @Post('update')
   @UseGuards(JwtAuthGuard)
   async updateProfile(@Body() body: { fullname: string; phone: string; address: string },
    @Req() req){
        const{fullname,phone,address} = body
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const userId = req.user.sub; // user id từ JWT payload
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const accessToken = req.headers.authorization?.split(' ')[1];
    return this.services.updateProfile(userId,fullname,phone,address,accessToken)
    }
}
