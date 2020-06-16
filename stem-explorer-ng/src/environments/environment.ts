// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { ConfigService } from 'src/app/config/config.service';

const config = new ConfigService();

export const environment = {
  production: false,
  //firebase connection
  firebaseConfig: {
    //tell ts to ignore that this "shouldnt" exist...
    apiKey: config.get('AUTH_API'),
    authDomain: "explorer-trial.firebaseapp.com",
    databaseURL: "https://explorer-trial.firebaseio.com",
    projectId: "explorer-trial",
    storageBucket: "explorer-trial.appspot.com",
    messagingSenderId: "165828341451",
    appId: "1:165828341451:web:b51d81781c8f524461354e",
    measurementId: "G-BDMF4PPT9T"
  }


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
