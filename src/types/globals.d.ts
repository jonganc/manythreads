declare const __PATH_PREFIX__: string;

// tslint:disable-next-line:no-namespace
declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}
