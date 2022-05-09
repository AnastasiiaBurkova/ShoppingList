const redirectTo = (path) => {
    return new Response(`Redirecting to ${path}.`, {
      status: 303,
      headers: {
        "Location": path,
      },
    });
  };

  const findShoppingListID = async (request) => {
    const url = new URL(request.url);
    const parts = url.pathname.split("/");
    const id = parts[2];

    return id;
  };

  const findItemID = async (request) => {
    const url = new URL(request.url);
    const parts = url.pathname.split("/");
    const id = parts[4];

    return id;
  }
  
  export { redirectTo, findShoppingListID, findItemID };