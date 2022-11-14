export function getVariable(key: string, mode = ""): string {
  // if (process?.env.TEST) {
  //   return process.env[key] ?? "";
  // }
  return import.meta.env[key];
}
