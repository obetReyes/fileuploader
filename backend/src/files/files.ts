import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';


// files provider 

// include your cloudinary credentials in the env file
export const FilesProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name:process.env.CLOUD_NAME,  
    api_key: process.env.CLOUD_API_KEY,
      api_secret:'L5KInZPPfqlfpaN8O2Ja1gvjllE',
    });
  },
};
