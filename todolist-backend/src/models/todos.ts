import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";

@Entity()
export default class Todos {
  @PrimaryGeneratedColumn()
  public todo_id: number;

  @Column()
  public title: string;

  @Column()
  public cate_id: number;

  @Column({
    type: "boolean",
    default: false
  })
  public is_finished: boolean;
}
