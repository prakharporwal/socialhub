import CONSTANTS from "src/EnvConstant";
import { useAuth } from "src/hooks/useAuth";

const apiHostname =   CONSTANTS.api_server_url.concat(CONSTANTS.path_prefix ?? "");
const commonHeaders = {
  "content-type": "application/json",
  "access-token": useAuth().accessToken || "no token found!",
};

class ApiCallerUtil {
  private apiHostname: string;
  private commonHeaders: Record<string, string>;

  constructor() {
    this.apiHostname = CONSTANTS.api_server_url.concat(CONSTANTS.path_prefix ?? "");
    this.commonHeaders = {
      "content-type": "application/json",
      "access-token": useAuth().accessToken || "no token found!",
    };
  }

  async get(path: string, options?: RequestInit): Promise<any> {
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

  async post(path: string, body: Record<string, any>, options?: RequestInit): Promise<any> {
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

  async put(path: string, body: Record<string, any>, options?: RequestInit): Promise<any> {
    return new Promise((resolve, reject) => {
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
        .then((body) => {
          resolve(body);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async delete(path: string, options?: RequestInit): Promise<any> {
    return new Promise((resolve, reject) => {
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
        .then((body) => {
          resolve(body);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

const ApiCaller = new ApiCallerUtil();

console.log("ApiCaller", ApiCaller)
export default ApiCaller;
