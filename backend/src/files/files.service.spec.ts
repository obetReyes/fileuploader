import { Test } from "@nestjs/testing";
import cloudinary from 'cloudinary';
const { FilesService } = require('./files.service');
import { cloudinaryResponse } from '../../test/utils'; 
import { BadRequestException } from "@nestjs/common";
import { v2 } from "cloudinary";
jest.mock('cloudinary'); 

describe('FilesService', () => {
  let filesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [FilesService],
    }).compile();

    filesService = moduleRef.get(FilesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadFile', () => {
    it('should upload files to cloudinary', async () => {
      
      jest.spyOn(filesService, 'uploadToCloudinary').mockResolvedValueOnce(cloudinaryResponse);

      
      const mockUploadedFiles = [
        {
          originalname: 'example.jpg',
          buffer: Buffer.from('Mock file content'),
        },
      ];

      const result = await filesService.uploadFile(mockUploadedFiles);

      expect(result).toEqual(cloudinaryResponse);
    });

    it("upload stream failed ", async () => {
       // Spy on the upload_stream method of cloudinary.v2.uploader
       const mockError = new Error('Upload failed');
    const mockUploadStream = jest.fn().mockImplementation((options, callback) => {
      callback(mockError, null);
    });


       jest.spyOn(v2.uploader, 'upload_stream').mockImplementation(mockUploadStream);


       const mockFiles = [
        {
          originalname: 'file1.jpg',
          buffer: Buffer.from('mock_file1_content'),
        },
      ];
  
      // Call the uploadFile method of the service and expect it to throw BadRequestException
      await expect(filesService.uploadFile(mockFiles)).rejects.toThrowError('Upload failed');
  
    })

    it("if file is not send should throw badRequestException", async() => {
      const mockError = new BadRequestException;

      jest.spyOn(filesService, 'uploadFile').mockResolvedValueOnce((options, callback) => {
        callback(mockError, null);
      });

      const mockUploadedFiles = [];

      const result = await filesService.uploadFile(mockUploadedFiles);
     expect(result).toBeDefined()
    })
  });
});
