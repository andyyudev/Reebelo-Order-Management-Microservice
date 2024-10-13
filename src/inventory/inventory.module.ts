import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
