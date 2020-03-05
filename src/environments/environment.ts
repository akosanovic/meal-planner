// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDdC8rIsp6hfxZlr0_2H3qV24w3dbmOrUc',
    authDomain: 'chronoplanner.firebaseapp.com',
    databaseURL: 'https://chronoplanner.firebaseio.com',
    projectId: 'chronoplanner',
    storageBucket: 'chronoplanner.appspot.com',
    messagingSenderId: '856022917091',
    appId: '1:856022917091:web:813f6fc152d83e6ef2cad6',
    measurementId: 'G-XSFHCHWHTE'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
