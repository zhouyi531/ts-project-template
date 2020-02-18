export function errorHandler(location: string, event: any) {
  const format = (error: any) => {
    let cache: any = [];
    const result = JSON.stringify(error, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Duplicate reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = null; // Enable garbage collection
    return result;
  };

  try {
    console.error(`[${location}] error:`, event.message || "error.message is not available");
    if (event.response && event.response.data) {
      console.error(`[${location}]`, format(event.response.data));
    } else {
      console.error(`[${location}]`, format(event));
    }
  } catch (error) {
    console.error("[errorHandler] error", error);
  }
}

export function logHandler(location: string, objName: string, event: any = null) {
  const format = (error: any) => {
    let cache: any = [];
    const result = JSON.stringify(error, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Duplicate reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = null; // Enable garbage collection
    return result;
  };

  try {
    if (!event) {
      console.log(`[${location}] ${objName}`);
    } else {
      console.log(`[${location}] ${objName}`, format(event));
    }
  } catch (error) {
    console.error("[errorHandler] error", error);
  }
}
