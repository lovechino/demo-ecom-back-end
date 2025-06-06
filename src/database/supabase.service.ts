/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './supabase.types';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient<Database>;
  private supabaseUrl: string;
  private supabaseKey: string;

  constructor() {
    this.supabaseUrl = process.env.SUPABASE_URL!;
    this.supabaseKey = process.env.SUPABASE_TOKEN!;

    if (!this.supabaseUrl || !this.supabaseKey) {
      throw new Error('Missing Supabase URL or Key in environment variables');
    }

    this.supabase = createClient<Database>(this.supabaseUrl, this.supabaseKey);
  }

  // Trả về supabase client bình thường (ví dụ dùng service_role key)
  getClient(): SupabaseClient<Database> {
    return this.supabase;
  }

  // Tạo client mới với access token user, để chạy các thao tác bị RLS kiểm soát
  getClientWithUserToken(accessToken: string): SupabaseClient<Database> {
    return createClient<Database>(this.supabaseUrl, this.supabaseKey, {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });
  }
}
