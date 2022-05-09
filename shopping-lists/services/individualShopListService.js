import { executeQuery } from "../database/database.js";

const create = async (name, shopListId) => {
    await executeQuery("INSERT INTO shopping_list_items (name, shopping_list_id) VALUES ($1, $2);", name, shopListId);
 };

const findListName = async (id) => {
    const result = await executeQuery("SELECT name FROM shopping_lists WHERE id = $1;", id);
    return result.rows[0];
 };

 const getItemsList = async (id) => {
    const result = await executeQuery("SELECT * FROM shopping_list_items WHERE shopping_list_id = $1 ORDER BY collected = true, name;", id);
    return result.rows;
 };

 const markCollected = async (id) => {
    await executeQuery("UPDATE shopping_list_items SET collected = true WHERE id = $1;", id);
 };

 export { create, findListName, getItemsList, markCollected };