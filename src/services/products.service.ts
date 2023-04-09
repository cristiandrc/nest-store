import { Injectable } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'bla bla',
      price: 123,
      image: '',
      stock: 3,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((item) => item.id === id);
  }

  create(payload) {
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  update(id, payload) {
    const productIndex = this.products.findIndex((item) => item.id === id);
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...payload,
    };
  }

  delete(id) {
    const productIndex = this.products.findIndex((item) => item.id === id);
    productIndex > -1 && this.products.splice(productIndex, 1);
    return productIndex;
  }
}
