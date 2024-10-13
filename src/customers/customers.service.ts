import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  async getCustomerDetails(customerId: string) {
    return {
      id: customerId,
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: '123 Main St, Springfield, USA',
    };
  }
}
