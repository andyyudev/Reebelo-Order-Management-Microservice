import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryService {
  // Mock for getting product details
  async getProductDetails(productId: string) {
    return {
      id: productId,
      name: 'Sample Product',
      sku: 'SAMPLE-123',
      availableQuantity: 100,
    };
  }

  // Method to check if a product has enough available quantity
  async checkProductAvailability(
    productId: string,
    requestedQuantity: number,
  ): Promise<boolean> {
    const product = await this.getProductDetails(productId); // Get product details

    // Check if requested quantity is less than or equal to available quantity
    if (requestedQuantity <= product.availableQuantity) {
      return true; // Product is available
    } else {
      return false; // Product is out of stock or insufficient quantity
    }
  }
}
