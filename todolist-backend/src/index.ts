import App from "./App";
import "dotenv/config";
import TodoController from "./controllers/todos.controller";
import CategoriesController from "./controllers/category.conteoller";

const app = new App([new TodoController(), new CategoriesController()], 5000);

app.listen();
