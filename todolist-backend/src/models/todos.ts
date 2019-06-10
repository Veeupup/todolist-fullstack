import { Column, BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";

@Entity()
export default class Todos {

  @PrimaryGeneratedColumn()
  todo_id: number;

  @Column()
  title: String;

  @Column()
  cate_id: number;

  @Column({
    type: "boolean",
    default: false
  })
  is_finished: boolean;

}


