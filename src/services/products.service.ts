import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { createProductDto, updateProductDto } from 'src/dtos/products.dto';

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
    const product = this.products.find((item) => item.id === id);

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }

  create(payload: createProductDto) {
    console.log(payload);
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  update(id: string, payload: updateProductDto) {
    const product = this.findOne(+id);
    const productIndex = this.products.findIndex((item) => item.id === +id);
    this.products[productIndex] = {
      ...product,
      ...payload,
    };
    return this.products[productIndex];
  }

  delete(id: number) {
    const product = this.products.find((item) => item.id === +id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const productIndex = this.products.findIndex((item) => item.id === +id);
    productIndex >= 0 && this.products.splice(productIndex, 1);
    return { message: `was deleted product with id ${id}` };
  }
}
