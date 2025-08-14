/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // 👈 thêm dòng này
// import { SupabaseService } from './database/supabase.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthModule } from './modules/Auth/auth.module';
import { ProductModule } from './modules/products/product.module';
import { CartModule } from './modules/cart/cart.module';
import { PaymentModule } from './modules/payment/payment.module';
import { OrderModule } from './modules/order/order.module';
import { ProfileModule } from './modules/profile/profile.module';
import { RedisModule } from './database/redis.module';



@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    CategoriesModule,
    AuthModule,
    ProductModule,
    CartModule,
    PaymentModule,
    OrderModule,
    ProfileModule,
    RedisModule
   
  ],
})
export class AppModule {}
