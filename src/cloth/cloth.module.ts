import { Module } from '@nestjs/common';
import { ClothService } from './cloth.service';

@Module({
  providers: [ClothService]
})
export class ClothModule {}
