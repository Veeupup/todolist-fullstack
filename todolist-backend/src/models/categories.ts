import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";

@Entity()
export default class Categories {

  @PrimaryGeneratedColumn()
  cate_id: number;

  @Column()
  name: String

  @Column()
  description: String

}
