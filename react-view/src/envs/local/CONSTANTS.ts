const Env = {
  dev: {
    api_server_url: "http://localhost:8080",
  },
  lan: {
    api_server_url: "http://192.168.0.184:8080",
  },
  prod: {
    api_server_url: "https://api.prakhar.works",
  },
};

const CONSTANTS = Env.dev;

export default CONSTANTS;
