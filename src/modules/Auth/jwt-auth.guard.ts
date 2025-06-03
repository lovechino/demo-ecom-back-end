/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const req = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const authHeader = req.headers['authorization'];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const token = authHeader.split(' ')[1];

    try {
      // Dynamic import jose
      const { jwtVerify, createRemoteJWKSet } = await import('jose');

      const JWKS = createRemoteJWKSet(
        new URL(`${process.env.SUPABASE_URL}/auth/v1/keys`)
      );

      const { payload } = await jwtVerify(token, JWKS, {
        issuer: `${process.env.SUPABASE_URL}/auth/v1`,
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      req.user = payload;
      return true;
    } catch (err) {
      console.error('JWT verify error:', err);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
