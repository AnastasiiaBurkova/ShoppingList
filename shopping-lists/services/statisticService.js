import { executeQuery } from "../database/database.js";

const countAllShopLists = async () => {
    const result = await executeQuery("SELECT COUNT(*) FROM shopping_lists;");
    return result.rows[0].count;
 };

 const countAllShopListItems = async () => {
    const result = await executeQuery("SELECT COUNT(*) FROM shopping_list_items;");
    return result.rows[0].count;
 };

 export { countAllShopLists, countAllShopListItems };