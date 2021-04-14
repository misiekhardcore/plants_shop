const getTimeStamp = (): string => {
  return new Date().toLocaleString("en-GB", { timeZone: "UTC" });
};

const loggings = {
  info: (namespace: string, message: string) => {
    console.info(
      `\x1b[2m[${getTimeStamp()}]\x1b[0m \x1b[32m[INFO]\x1b[0m \x1b[2m[${namespace.toUpperCase()}]\x1b[0m ${message}`
    );
  },
  warn: (namespace: string, message: string) => {
    console.warn(
      `\x1b[2m[${getTimeStamp()}]\x1b[0m \x1b[33m[WARN]\x1b[0m \x1b[2m[${namespace.toUpperCase()}]\x1b[0m ${message}`
    );
  },
  error: (namespace: string, message: string) => {
    console.error(
      `\x1b[2m[${getTimeStamp()}]\x1b[0m \x1b[31m[ERROR]\x1b[0m \x1b[2m[${namespace.toUpperCase()}]\x1b[0m ${message}`
    );
  },
  debug: (namespace: string, message: string) => {
    console.debug(
      `\x1b[2m[${getTimeStamp()}]\x1b[0m \x1b[35m[DEBUG]\x1b[0m \x1b[2m[${namespace.toUpperCase()}]\x1b[0m ${message}`
    );
  },
};

export default loggings;
