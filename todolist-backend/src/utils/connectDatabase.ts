import { createConnection, Connection } from "typeorm";
import Todo from "../models/todos";
import Categories from "../models/categories";

// connect database
export default function connectToDatabase(): Promise<Connection> {
  const { MYSQL_USER, MYSQL_PASSWORD, HOST, DATABASE } = process.env;

  let connect = createConnection({
    type: "mysql",
    host: HOST,
    port: 3306,
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: DATABASE,
    entities: [Todo, Categories],
    synchronize: false,
    logging: false
  });
  return connect;
}
