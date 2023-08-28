import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { cloudinaryResponse } from '../../test/utils';
const path = require("path")



jest.mock('cloudinary'); 

describe('FilesController (E2E)', () => {
  let app: INestApplication;
  let filesService;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [FilesService],
    }).compile();

    filesService = moduleFixture.get(FilesService);
    app = moduleFixture.createNestApplication();
    await app.init();
    
  });
  afterEach(() => {
    jest.clearAllMocks();
    
  });
  afterAll(async () => {
    await app.close();

  });

  it('should upload images and return success message', async () => {
    jest.spyOn(filesService, 'uploadToCloudinary').mockResolvedValue(cloudinaryResponse);

    
      const mockUploadedFiles = [
        {
          originalname: 'example.jpg',
          buffer: Buffer.from('Mock file content'),
        },
      ];

    const response = await request(app.getHttpServer())
      .post('/files')
      .attach('files', path.resolve(__dirname, "../../test/assets/test.jpg"))
      .attach('files', path.resolve(__dirname, '../../test/assets/test_vid.mp4'));

    expect(response.status).toBe(HttpStatus.CREATED);
   
  });

  it('should return 422 status when trying to upload invalid file types', async () => {
    const response = await request(app.getHttpServer())
      .post('/files')
      .attach('files', path.resolve(__dirname, '../../test/assets/test_txt.txt'));

    expect(response.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
  });


  it('should return error if body included', async () => {
    const response = await request(app.getHttpServer())
      .post('/files')
      .send({
        file:"file"
      })
    expect(response.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
  });


});


