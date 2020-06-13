// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //firebase connection
  firebaseConfig: {
    //tell ts to ignore that this "shouldnt" exist...
    apiKey: (window as any).env.AUTH_API as string,
    authDomain: "explorer-challenge-test.firebaseapp.com",
    databaseURL: "https://explorer-challenge-test.firebaseio.com",
    projectId: "explorer-challenge-test",
    storageBucket: "explorer-challenge-test.appspot.com",
    messagingSenderId: "360924006501",
    appId: "1:360924006501:web:7692764af96ad5ebd5de8c"
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

//git push attempt