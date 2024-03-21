import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Role } from 'src/role/entity/role.entity';
import { Product } from 'src/product/entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Product])],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
