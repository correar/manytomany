import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatController } from './cat/cat.controller';
import { CatModule } from './cat/cat.module';
import { ClothController } from './cloth/cloth.controller';
import { ClothModule } from './cloth/cloth.module';

@Module({
  imports: [CatModule, ClothModule],
  controllers: [AppController, CatController, ClothController],
  providers: [AppService],
})
export class AppModule {}
