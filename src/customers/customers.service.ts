import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  async getCustomerDetails(customerId: string) {
    return {
      id: customerId,
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '555-555-5555',
      payment: {
        method: 'visa',
        card_last4: '4242',
        expires: '12/2024',
      },
      billing_address: {
        address_1: '1234 Elm St',
        address_2: 'Suite 100',
        city: 'Springfield',
        state: 'IL',
        zip: '62701',
        country: 'US',
      },
      shipping_address: {
        address_1: '1234 Elm St',
        address_2: 'Suite 100',
        city: 'Springfield',
        state: 'IL',
        zip: '62701',
        country: 'US',
      },
    };
  }
}
