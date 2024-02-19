export class API {
  constructor(globalParams = {}, errorHandler) {
    this._uri = `${process.env.NEXT_PUBLIC_API_URL}/`;
    this._globalParams = globalParams;

    return new Proxy(this, {
      get: (object, key, value, proxy) => {
        return async (params) => {
          const response = await fetch(this._uri, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              method: key,
              params: {
                ...this._globalParams,
                ...params,
              },
            }),
          });

          const responseObject = await response.json();

          if (responseObject.error) {
            if (errorHandler) {
              await errorHandler(responseObject.error);
              throw new Error("Error handler did not throw");
            } else {
              throw responseObject.error;
            }
          } else if (responseObject.result !== undefined) {
            return responseObject.result;
          } else {
            throw new Error("Invalid response");
          }
        };
      },
    });
  }
}
