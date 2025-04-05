import CONSTANTS from "src/EnvConstant";
import { getCookie } from "../cookieUtils";

class ApiCallerUtil {
  apiHostname: string;
  commonHeaders: HeadersInit;

  constructor(apiHostname: string, prefix?: string) {
    this.apiHostname = apiHostname.concat(prefix ?? "");
    this.commonHeaders = {
      "content-type": "application/json",
      "access-token": getCookie("access_token") || "",
    };
  }

  async get(path: string, options?: RequestInit) {
    return new Promise((resolve, reject) => {
      fetch(this.apiHostname.concat(path), {
        headers: {
          ...this.commonHeaders,
          ...(options && options.headers),
        },
        method: "GET",
      })
        .then(async (res) => {
          if (res.ok || res.status === 201) {
            return res.json();
          }
          let resp = await res.json();

          throw new Error(JSON.stringify(resp));
        })
        .then((body) => {
          resolve(body);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async post(path: string, body: Record<string, any>, options: RequestInit) {
    return new Promise((resolve, reject) => {
      fetch(this.apiHostname.concat(path), {
        headers: {
          ...this.commonHeaders,
          ...(options && options.headers),
        },
        method: "POST",
        body: body && JSON.stringify(body),
      })
        .then(async (res) => {
          if (res.ok || res.status === 201) {
            return res.json();
          }
          let resp = res.json()
          throw new Error(JSON.stringify(resp));
        })
        .then((body) => {
          resolve(body);
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {});
    });
  }

  put(path: string, body: Record<string, any>, options?: RequestInit) {
    fetch(this.apiHostname.concat(path), {
      headers: {
        ...this.commonHeaders,
        ...(options && options.headers),
      },
      method: "PUT",
      body: body && JSON.stringify(body),
    })
      .then(async (res) => {
        if (res.ok || res.status === 201) {
          return res.json();
        }

        let resp = {};
        await res.json().then((body) => {
          resp = body;
        });

        throw new Error(JSON.stringify(resp));
      })
      .then()
      .catch(() => {})
      .finally(() => {});
  }

  delete(path: string, options?: RequestInit) {
    fetch(this.apiHostname.concat(path), {
      headers: {
        ...this.commonHeaders,
        ...(options && options.headers),
      },
      method: "DELETE",
    })
      .then(async (res) => {
        if (res.ok || res.status === 201) {
          return res.json();
        }

        let resp = {};
        await res.json().then((body) => {
          resp = body;
        });

        throw new Error(JSON.stringify(resp));
      })
      .then()
      .catch(() => {})
      .finally(() => {});
  }
}

const ApiCaller = new ApiCallerUtil(
  CONSTANTS.api_server_url,
  CONSTANTS.path_prefix
);
export default ApiCaller;
