import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";

@Entity()
export default class Categories {
  @PrimaryGeneratedColumn()
  public cate_id: number;

  @Column()
  public name: string;

  @Column()
  public description: string;
}
