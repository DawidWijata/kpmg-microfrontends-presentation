const { share, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "searchbar": "http://localhost:4201/remoteEntry.js", 
    "basicinfo": "http://localhost:4202/remoteEntry.js",    
    "rank": "http://localhost:4203/remoteEntry.js",    
    "masteries": "http://localhost:4204/remoteEntry.js",
    "history": "http://localhost:4205/remoteEntry.js",
  },

  shared: share({
    "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
    "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
    "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },                     
    "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  }),

});
