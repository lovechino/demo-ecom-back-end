/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  public client: RedisClientType;

  async onModuleInit() {
    this.client = createClient({
      username: 'default',
      password: process.env.password,
      socket: {
        host: process.env.host,
        port: 18795,
      },
    });

    this.client.on('error', (err) => {
      console.error('Redis Client Error', err);
    });

    await this.client.connect();
    console.log('✅ Redis connected');
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  // SET key
  async set(key: string, value: string) {
    return this.client.set(key, value);
  }

  // GET key
  async get(key: string) {
    return this.client.get(key);
  }
}
