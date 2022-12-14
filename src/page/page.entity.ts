import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Page')
export class Page {

  @PrimaryGeneratedColumn({
    type: 'int'
  })
  PageId: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false
  })
  Uri: string;

  @Column({
    type: 'varchar',
    length: 3,
    nullable: false,
    default: '000'
  })
  Show_In: string;

  @Column({
    type: 'datetime',
    nullable: false
  })
  Creation_Date: any;
}