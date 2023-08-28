import { faker } from '@faker-js/faker';

interface ImageI{
    blobPart:string
    filename:string
    type:string
}
export function createRandomImage():  ImageI {
    return {
        blobPart: faker.string.sample(120),
        filename: faker.person.firstName(),
        type:"image/jpg"
    };
  }

  export const images: ImageI[] = faker.helpers.multiple(createRandomImage, {
    count: 40,
  });
