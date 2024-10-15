# Reebelo Order Management Microservice

## Description

Reebelo case study for Order Management Microservice.

All API endpoints are fully functional, and errors are properly caught; however, there is no column level validation in place for this demo.

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

- Authentication & Authorization: Secure access control using mechanisms like OAuth or JWT.
- API Rate Limiting: Prevent abuse and ensure fair usage.
- Logging & Monitoring: Track performance and detect issues early.
- Service Resilience: Implement retries, timeouts, and circuit breakers for external service calls.
- Data Consistency & Integrity: Ensure the database supports ACID transactions or distributed locks for reliable data handling.
- API Versioning: Plan for version control to maintain backward compatibility.
- Caching: Use caching for frequently accessed data (e.g., inventory, orders, customers).

## API Endpoints

- Create Orders
  - Implement idempotency to handle race condition.
  - Retries for calling external services. (Not implemented)
  - Validate customer information. (Mock service)
  - Validate inventory information. (Mock service)

- Update Orders
  - Following the single responsibility principle, I would break down the order update process into multiple methods.
    - Update payment information. (Added endpoint, but returns error message)
    - Update shipping information. (Added endpoint, but returns error message)
    - Update shipment tracking information.
    - ** I would remove the update status endpoint to prevent direct manipulation, ensuring status changes are triggered by specific business events only. **
  - Handle order status conflicts when order information is updated or the order has been deleted.
  - Trigger an order status update when order information changes.
  - Trigger notification service. (Not implemented)

- Update Order Status
  - ** I would remove the update status endpoint to prevent direct manipulation, ensuring status changes are triggered by specific business events only. **
  - Trigger notification service. (Not implemented)

- Delete Orders
  - Return http status code 204 after successful deletion, current NestJS returns standard 200 status.
  - Implement soft delete to maintain data integrity. (Not implemented)

## Service Dependencies

- This microservice relies on the following external services:
  - Customer Service
    - Fetches customer details, including payment and shipping information.
  - Inventory Service
    - Manages product and stock availability checks.
  - Payment Service (Not implemented)
    - Processes payments for orders.
  - Shipping Service (Not implemented)
    - Retrieves shipping rates and delivery updates.
  - Notification Service (Not implemented)
    - Sends email and app notifications related to orders.

## Infrastructure & Deployment Strategies

### Compute

- High Availability
  - Amazon ECS will deploy the microservice across multiple availability zones to ensure uptime.
- Scalability
  - ECS Auto Scaling adjusts the number of instances based on traffic.
- Security
  - ECS tasks run in a VPC with security groups, and IAM roles restrict access to AWS resources.
- Cost
  - ECS Fargate or EC2 Spot Instances can be used to minimize costs by running tasks only when necessary.

### Database

- High Availability:
  - Amazon RDS with Multi-AZ for failover and redundancy.
- Scalability:
  - RDS will use read replicas and auto-scaling for peak loads.
- Security:
  - Data encryption via AWS KMS, with restricted VPC access.
- Cost Efficiency:
  - Use RDS burstable instances or reserved instances to balance performance and cost.

### API Gateway

- High Availability:
  - Amazon API Gateway ensures seamless failover and continuous operation.
- Scalability:
  - Automatically scales to handle increasing traffic without manual intervention.
- Security:
  - Integrated with Cognito for authentication and secure communication over HTTPS.
- Cost Efficiency:
  - Pay-per-request pricing ensures cost control based on usage.

### Storage

- High Availability:
  - Amazon S3 stores assets with automatic replication across availability zones.
- Security:
  - Encrypted data and strict bucket policies.
- Cost Efficiency:
  - S3’s lifecycle policies to archive infrequent data and reduce storage costs.

### Queues (Async operations)

Use Amazon SQS to offload asynchronous tasks such as payment processing, shipping updates, and sending notifications. This improves API response time by handling background tasks without blocking the user-facing requests.

### Caching

Use caching (e.g., ElastiCache Redis) for frequently accessed data like inventory, customer details, and order statuses to reduce load and improve response times.