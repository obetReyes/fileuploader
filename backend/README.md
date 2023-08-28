# SIMPLE MULTIPLE FILE UPLOADER NEST JS 



> save images and videos  in a cloudinary service, you need have the cloudinary crendentials and save them in a env file
> .env file in root  backend folder need these credentials (You receive the credentials when you log in to the cloudinary website) 
 <br/>
CLOUD_NAME='cloud_name'
 <br/>
CLOUD_API_KEY='cloud_api_key'
 <br/>
CLOUD_API_SECRET='cloud_api_secret' 

## Docs

- run the server in dev mode and hit the /docs to learn more about the use 

```bash
# docs
$ npm run start:dev

# endpoint
$ GET http:localhost:3000/docs

```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## packages in use 
- pino
- cloudinary sdk
- jest
. multer
- supertest 
- helmet 
- @nestjs/throttler
- @nestjs/swagger
