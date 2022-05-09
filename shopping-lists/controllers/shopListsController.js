import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as shopListsService from "../services/shopListsService.js";
import * as requestUtils from "../utils/requestUtils.js";



const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };


const listShopLists = async () => {
     const data = {
        lists : await shopListsService.findAllActiveShopLists(),
     };
     return new Response(await renderFile("shoppingLists.eta", data), responseDetails);
};

const addShoppingList = async (request) =>{
    const formData = await request.formData();
    const name = formData.get("name");
  
    await shopListsService.create(name);
    return requestUtils.redirectTo("/lists");
};

const deactivateList = async (request) => {
  const id = await requestUtils.findShoppingListID(request);
  await shopListsService.deactivate(id);
  return requestUtils.redirectTo("/lists");
};

export { listShopLists, addShoppingList, deactivateList };
