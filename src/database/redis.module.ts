/* eslint-disable prettier/prettier */
// src/redis/redis.module.ts
import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';

@Global() // để có thể dùng RedisService ở mọi module mà không cần import lại
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
