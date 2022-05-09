import { serve } from "https://deno.land/std@0.120.0/http/server.ts";
import * as shopListsController from "./controllers/shopListsController.js";
import * as individualShopListController from "./controllers/individualShopListController.js";
import * as mainPageController from "./controllers/mainPageController.js";
import { configure } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as requestUtils from "./utils/requestUtils.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

let port = 7777;
if (Deno.args.length > 0) {
const lastArgument = Deno.args[Deno.args.length - 1];
port = Number(lastArgument);
};


const handleRequest = async (request) => {
   const url = new URL(request.url);
   const id = await requestUtils.findShoppingListID(request);
   const itemId = await requestUtils.findItemID(request);
   if (url.pathname === "/") {
      return await mainPageController.showStatistics();
   }
   else if (request.method === "GET" && url.pathname === "/lists") {
      return await shopListsController.listShopLists();
   }
   else if (request.method === "POST" && url.pathname === "/lists") {
      return await shopListsController.addShoppingList(request);
   }
   else if (request.method === "POST" && url.pathname.includes("deactivate")) {
      return await shopListsController.deactivateList(request);
   }
   else if (request.method === "GET" && url.pathname === "/lists/" + id) {
       return await individualShopListController.displayShopListById(request);
   }
   else if (request.method === "POST" && url.pathname === "/lists/" + id + "/items") {
      return await individualShopListController.addItemToList(request);
   } 
   else if (request.method === "POST" && url.pathname === "/lists/" + id + "/items/" + itemId + "/collect") {
      return await individualShopListController.collectItem(request);
   }
   else {
    return new Response("Not found", { status: 404 });
   }

};

serve(handleRequest, { port: port });
