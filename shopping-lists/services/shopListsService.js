import { executeQuery } from "../database/database.js";

const create = async (name) => {
   await executeQuery("INSERT INTO shopping_lists (name) VALUES ($1);", name);
};

const findAllActiveShopLists = async () => {
   const result = await executeQuery("SELECT * FROM shopping_lists WHERE active = true;");
   return result.rows;
};

const deactivate = async (id) => {
   await executeQuery("UPDATE shopping_lists SET active = false WHERE id = $1;", id);
};


export { create, findAllActiveShopLists, deactivate };