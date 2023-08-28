import { Module,} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilesService } from './files.service';
import { FilesProvider } from './files';
import { FilesController } from './files.controller';

@Module({
  imports:[ConfigModule],
  providers: [FilesService, FilesProvider],
  controllers: [FilesController]
})
export class FilesModule {}
