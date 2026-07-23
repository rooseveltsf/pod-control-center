import { resolve } from "node:path";
import { LocalStore } from "./store.js";
import { createApiServer } from "./server.js";

const port = Number(process.env.PORT ?? 3100);
const dataFile = resolve(process.env.POD_CONTROL_DATA_FILE ?? "data/pod-control-center.local.json");

if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  throw new Error("PORT deve ser um número entre 1 e 65535.");
}

const store = await LocalStore.open(dataFile);
const server = createApiServer(store);

server.listen(port, "127.0.0.1", () => {
  console.log(`Pod Control API disponível em http://127.0.0.1:${port}`);
  console.log(`Dados locais: ${dataFile}`);
});
