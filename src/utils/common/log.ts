// import { fileURLToPath } from "url";
// import path from "path";

// export const __filename = fileURLToPath(import.meta.url);
// export const __dirname = path.dirname(__filename);

export async function logInfos(...args: any[]) {
  const { fileURLToPath } = await import("url");
  const path = await import("path");

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  console.log(__dirname, ...args);
}
