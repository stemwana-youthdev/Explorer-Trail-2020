import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: Record<string, any> = {};

  constructor() {
    // Read environment variables from browser window
    const browserWindow = window || {};
    // tslint:disable-next-line: no-string-literal
    const browserWindowEnv = browserWindow['env'] || {};
    this.config = browserWindowEnv;
  }

  get<T = any>(name: string, defaultValue?: T) {
    const value = this.config[name];
    if (typeof value === 'undefined') {
      return defaultValue;
    }
    return (value as unknown) as T;
  }
}
