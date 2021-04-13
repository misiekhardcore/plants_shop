const getTimeStamp = (): string => {
  return new Date().toLocaleString("en-GB", { timeZone: "UTC" });
};

const loggings = {
  info: (namespace: string, message: string, object: any = "") => {
    console.info(
      `\x1b[2m[${getTimeStamp()}]\x1b[0m \x1b[32m[INFO]\x1b[0m \x1b[2m[${namespace}]\x1b[0m ${message}`,
      object
    );
  },
  warn: (namespace: string, message: string, object: any = "") => {
    console.warn(
      `\x1b[2m[${getTimeStamp()}]\x1b[0m \x1b[33m[WARN]\x1b[0m \x1b[2m[${namespace}]\x1b[0m ${message}`,
      object
    );
  },
  error: (namespace: string, message: string, object: any = "") => {
    console.error(
      `\x1b[2m[${getTimeStamp()}]\x1b[0m \x1b[31m[ERROR]\x1b[0m \x1b[2m[${namespace}]\x1b[0m ${message}`,
      object
    );
  },
  debug: (namespace: string, message: string, object: any = "") => {
    console.debug(
      `\x1b[2m[${getTimeStamp()}]\x1b[0m \x1b[35m[DEBUG]\x1b[0m \x1b[2m[${namespace}]\x1b[0m ${message}`,
      object
    );
  },
};

export default loggings;
