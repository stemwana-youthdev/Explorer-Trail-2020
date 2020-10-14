import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  // private config: Record<string, any> = {};

  // constructor() {
  //   // Read environment variables from browser window
  //   const browserWindowEnv = (window || {});
  //   console.warn('browserWindowEnv', browserWindowEnv)
  //   this.config = browserWindowEnv;
  // }

  // get<T = any>(name: string, defaultValue?: T): any {
  //   const value = this.config[name];
  //   if (typeof value === 'undefined') {
  //     return defaultValue;
  //   }
  //   return (value as unknown) as T;
  // }

  private appConfig;

  constructor(private http: HttpClient) { }

  /**
   * Must be called on APP_INITIALIZER, so that it can be loaded
   * prior to showing the app.
   */
  loadAppConfig(): Promise<any> {
    return this.http.get('/assets/configuration.json?v=1').pipe(
      tap((r: any) => {
        console.warn(r)
        this.appConfig = r;
      })).toPromise();
  }

  getConfig(): any {
    return this.appConfig;
  }
}
