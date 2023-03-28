const { share, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'match-history',

  exposes: {
    './Component': './src/app/app.component.ts',
  },

  shared: share({
    "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
    "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
    "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },                     
    "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  }),

});
