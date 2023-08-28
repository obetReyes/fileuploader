import { Test, TestingModule } from '@nestjs/testing';
import { FilesProvider } from './files';
import { ConfigOptions } from 'cloudinary';

import { CLOUDINARY } from './constants';

interface FilesProviderI {
  provide: string;
  useFactory: () => ConfigOptions;
}
describe('Files', () => {
  let provider: FilesProviderI;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesProvider],
    }).compile();

    provider = module.get<FilesProviderI>(CLOUDINARY);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
