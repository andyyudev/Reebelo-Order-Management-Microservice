# Reebelo Order Management Microservice

## Description

Reebelo case study for Order Management Microservice.

For demonstration purposes, this microservice uses TypeORM with SQLite database. In a production environment, it can be configured to use AWS database services such as Amazon RDS for relational data or DynamoDB for NoSQL storage.

** Please bear in mind that this is the first time I’ve used NestJS, so some implementations and design patterns might not be correct. **

## Getting Started

### Clone project

```bash
$ git clone git@github.com:andyyudev/Reebelo-Order-Management-Microservice.git
```

### Project setup

```bash
$ npm install
```

### Any questions?

- Author - [Andy Yu](https://andyyu.dev)
- Email me - <hi@andyyu.dev>

### Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Run tests

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

## API Endpoints

- Create Orders
  - Implement idempotency to handle race condition.
  - Retries for calling external services.
  - Validate customer information.
  - Validate inventory information.

- Update Orders
  - Following the single responsibility principle, i would break down update orders into multiple methods.
    - Update payment information.
    - Update shipping information.
    - Update shipment tracking information.
    - ***I would remove update status endpoint entirely to avoid direct manipulation of the order status, so order status are triggered only by specific business events.
  - Handle order status conflict with order information being updated, or order has been deleted.
  - Trigger update order status when order information changes.
  - Trigger notification service.

- Update Order Status
  - ***I would remove update status endpoint entirely to avoid direct manipulation of the order status, so order status are triggered only by specific business events.
  - Handle race condition when order has been deleted.
  - Allow batch update?
  - Trigger notification service.

- Delete Orders
  - Return http status code 204 after successful deletion, current NestJS returns standard 200 status.
  - Allow batch delete?
  - Implement soft delete to maintain data integrity.

## Service Dependencies

- This microservice relies on the following external services:
  - Customer Service
    - Fetches customer details, including payment and shipping information.
  - Inventory Service
    - Manages product and stock availability checks.
  - Payment Service
    - Processes payments for orders.
  - Shipping Service
    - Retrieves shipping rates and delivery updates.
  - Notification Service
    - Sends email and app notifications related to orders.

## Infrastructure & Deployment Strategies
- ???
- ???