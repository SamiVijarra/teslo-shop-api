import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ProductImage } from '../entities';
import { User } from '../../auth/entities/user.entity';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '047f32cb-127c-46f6-8dcb-c206aa10d312',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    example: 'Men Turbine Long Sleeve Tee',
    description: 'Product Title',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  title!: string;

  @ApiProperty({
    example: 0,
    description: 'Product Price',
  })
  @Column('float', {
    default: 0,
  })
  price!: number;

  @ApiProperty({
    example: `Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Long Sleeve Tee features a subtle, water-based T logo on the left chest and our Tesla wordmark below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
    "slug": "men_turbine_long_sleeve_tee`,
    description: 'Product description',
    default: null,
  })
  @Column('text', {
    nullable: true,
  })
  description!: string;

  @ApiProperty({
    example: 'men_turbine_long_sleeve_tee',
    description: 'Product SLUG - for SEO',
  })
  @Column('text', {
    unique: true,
  })
  slug!: string;

  @ApiProperty({
    example: 10,
    description: 'Product Stock',
    default: 0,
  })
  @Column('int', {
    default: 0,
  })
  stock!: number;

  @ApiProperty({
    example: ['XS', 'S', 'M', 'L'],
    description: 'Product Sizes',
  })
  @Column('text', {
    array: true,
  })
  sizes!: string[];

  @ApiProperty({
    example: `"Men", "woman"`,
    description: 'Product gender',
  })
  @Column('text')
  gender!: string;

  @ApiProperty({
    example: ['shirt'],
    description: 'Product Tags',
  })
  @Column('text', {
    array: true,
    default: [],
  })
  tags!: string[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user!: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll("'", '');
  }
  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll("'", '');
  }
}
