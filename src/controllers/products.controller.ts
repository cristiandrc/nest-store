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
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from 'src/services/products.service';
import { ParseIntTwoPipe } from 'src/common/parse-int/parse-int.pipe';
import { createProductDto, updateProductDto } from 'src/dtos/products.dto';

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
  getProduct(
    @Res() response: Response,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    response.status(HttpStatus.OK).send(this.productService.findOne(productId));
  }

  @Post()
  create(@Body() payload: createProductDto) {
    return this.productService.create(payload);
    // return {
    //   message: 'Accion de crear',
    //   payload,
    // };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: updateProductDto) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntTwoPipe) id: number) {
    return this.productService.delete(id);
  }
}
