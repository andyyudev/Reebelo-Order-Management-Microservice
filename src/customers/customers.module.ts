import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
