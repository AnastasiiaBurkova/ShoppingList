import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as statisticService from "../services/statisticService.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const showStatistics = async () => {
   const data = {
       numOfShopLists : await statisticService.countAllShopLists(),
       numOfShopListItems : await statisticService.countAllShopListItems(),
   };
   console.log("data Main ", data);
   return new Response(await renderFile("mainPage.eta", data), responseDetails);
};

 export { showStatistics };