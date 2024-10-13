# Reebelo Order Management Microservice

## Description

Reebelo case study for order management microservice

## Clone project

```bash
$ git clone git@github.com:andyyudev/Reebelo-Order-Management-Microservice.git
```

## Project setup

```bash
$ npm install
```

## Stay in touch

- Author - [Andy Yu](https://andyyu.dev)

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## System Design Considerations

Out of scope for this case study, but worth mentioning

- Authentication and Authorizations

- API Rate Limiting
  - Prevent abuse or unintentional overloading for each endpoints.

- Logging and Monitoring

- Service Resilience
  - Implementing retries to calling external services.

- Data Consistency and Integrity
  - What type of database are we using? does it support ACID transactions or distributed locks to ensure data consistency and integrity?

- Versioning
  - How to handle version control?

- Caching
  - Add caching mechanism for frequently accessed data like inventory order customer information?

## API Endpoint Design Considerations

- Create Orders
  - Implement idempotency to handle race condition.
  - Retries for calling external services.
  - Validate customer information.
  - Validate inventory information.

- Update Orders
  - Handle order status conflict with order information being updated, or order has been deleted.
  - Ability to extend update features, such as update payment information, update shipping address, etc.
  - Trigger update order status when order information changes.
  - Trigger notification service.

- Update Order Status
  - Handle race condition when order has been deleted.
  - Allow batch update?
  - Trigger notification service.

- Delete Orders
  - Allow batch delete?
  - Implement soft delete to maintain data integrity.
  