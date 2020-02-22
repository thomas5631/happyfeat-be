# Happyfeat Backend
Backend for the happyfeat feature flag application

This project uses prisma, graphql for authenticated requests,  and REST, but only for unauthenticated requests.

# Running this project
To run this project locally, you must install:
 - [docker and docker-compose](https://docs.docker.com/install/)
 - [nvm](https://github.com/nvm-sh/nvm)

Start the project with:
```sh
docker-compose up -d
yarn start
```

To view logs of the prisma server and database, you can run:
```sh
docker-compose logs -f
```

To interact with the prisma admin, you can visit http://localhost:4466/_admin

# Tests
Tests are written in Jest, and can be run with the command:
```sh
yarn test
```

# Linting
Linting is completed with eslint. Note that linting is disabled on prisma generated files. These
files should not be manually edited, and should not be linted. Linting can be run with the
command:
```sh
yarn lint
```
