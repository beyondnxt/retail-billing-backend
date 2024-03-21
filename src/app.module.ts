import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ProductModule } from './product/product.module';
import { InventoryModule } from './inventory/inventory.module';
import { BillingModule } from './billing/billing.module';
import { CategoryModule } from './category/category.module';
import { User } from './user/entity/user.entity';
import { Role } from './role/entity/role.entity';
import { AuthenticationMiddleware } from './common/middleware/authentication.middleware';
import { RequestService } from './common/request.service';
import { Product } from './product/entity/product.entity';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Role, Product],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    RoleModule,
    ProductModule,
    InventoryModule,
    BillingModule,
    CategoryModule,],
  controllers: [AppController],
  providers: [AppService, 
    RequestService
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).exclude(
      { path: 'auth/signup', method: RequestMethod.POST },
      { path: 'auth/signin', method: RequestMethod.POST },
      { path: 'auth/forgotPassword', method: RequestMethod.PUT },
      { path: 'auth/resetPasswordUsingId/:id', method: RequestMethod.PUT },
      { path: 'auth/email/changePassword', method: RequestMethod.POST },

    ).forRoutes('*');
  }
}
