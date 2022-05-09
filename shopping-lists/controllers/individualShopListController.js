import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as individualShopListService from "../services/individualShopListService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };

const displayShopListById = async (request) => {
  const id = await requestUtils.findShoppingListID(request);
    const data = {

      obj : await individualShopListService.findListName(id),
      id : id,
      items : await individualShopListService.getItemsList(id),
      
    };
    console.log("data ", data);
    return new Response(await renderFile("individualShopList.eta", data), responseDetails);
};

const addItemToList = async (request) => {
  const id = await requestUtils.findShoppingListID(request);
  console.log("Why not?? ", id);
  const formData = await request.formData();
  const name = formData.get("name");

  await individualShopListService.create(name, id);
  return requestUtils.redirectTo("/lists/" + id);
}

const collectItem = async (request) => {
  const id = await requestUtils.findShoppingListID(request);
  const itemID = await requestUtils.findItemID(request);

  await individualShopListService.markCollected(itemID);
  return requestUtils.redirectTo("/lists/" + id);
};

export { displayShopListById, addItemToList, collectItem };