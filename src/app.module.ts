/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // 👈 thêm dòng này
// import { SupabaseService } from './database/supabase.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthModule } from './modules/Auth/auth.module';
import { ProductModule } from './modules/products/product.module';
import { CartModule } from './modules/cart/cart.module';
import { CartModule } from './modules/cart/cart.module';


@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    CategoriesModule,
    AuthModule,
    ProductModule,
    CartModule
   
  ],
  // providers: [SupabaseService],
  // exports: [SupabaseService],
})
export class AppModule {}
