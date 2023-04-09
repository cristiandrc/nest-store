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

  update(id: string, payload) {
    const product = this.findOne(+id);
    const productIndex = this.products.findIndex((item) => item.id === +id);
    this.products[productIndex] = {
      ...product,
      ...payload,
    };
    return this.products[productIndex];
  }

  delete(id: string) {
    const productIndex = this.products.findIndex((item) => item.id === +id);
    productIndex >= 0 && this.products.splice(productIndex, 1);
    return { message: `was deleted product with id ${id}` };
  }
}
