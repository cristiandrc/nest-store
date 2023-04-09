import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ProductsService } from 'src/services/products.service';

import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    // return {
    //   message: `products limit=> ${limit} offset => ${offset} brand => ${brand}`,
    // };

    return this.productService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return { message: `yo soy un filter` };
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Res() response: Response, @Param('productId') productId: string) {
    response
      .status(HttpStatus.OK)
      .send(this.productService.findOne(parseInt(productId)));
  }

  @Post()
  create(@Body() payload: any) {
    return this.productService.create(payload);
    // return {
    //   message: 'Accion de crear',
    //   payload,
    // };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
