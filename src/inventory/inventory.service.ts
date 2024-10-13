import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryService {
  async getProductDetails(productId: string) {
    return {
      id: productId,
      name: 'Sample Product',
      availableQuantity: 100,
      variants: [
        {
          id: 'variant1',
          color: 'red',
          size: 'M',
          price: 29.99,
        },
      ],
    };
  }
}
