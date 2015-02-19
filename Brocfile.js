var Funnel                  = require('broccoli-funnel');
var mergeTrees              = require('broccoli-merge-trees');
var findBowerTrees          = require('broccoli-bower');
var uglifyJavaScript        = require('broccoli-uglify-js');
var concatFiles             = require('broccoli-concat');
var transpileES6            = require('broccoli-es6-module-transpiler');
var debug                   = require('broccoli-stew').debug;

/** 
 * Build Environment
 **/
var env = process.env.BROCCOLI_ENV || 'development';

/** 
 * Bower Vendors
 **/
var vendorTree = 'bower_components';

/**
 * Application
 **/
var publicTree = 'public';
var appTree = 'app/javascripts';

// Transpile ES6 to ES5
// Dont't need module for now
/*
var appTranspiledTree = transpileES6(appTree, {
  formatter: 'bundle',
  output: appTranspiledFile,
});
*/

// Concat vendor components
//var appAndVendorTree = mergeTrees([appTree].concat(bowerTrees));

var appFiles = ['**/*.js'];
var vendorFiles = null;
if (env === 'production') {
  vendorFiles = [
    'jquery/dist/jquery.min.js',
    'ember/ember.min.js'
  ]; 
}
else {
  vendorFiles = [
    'jquery/dist/jquery.min.js',
    'ember/ember.debug.js'
  ]; 
}

var appJS = concatFiles(appTree, {
  inputFiles: appFiles,
  outputFile: '/app_bundle.js'
});

var vendorJS = concatFiles(vendorTree, {
  inputFiles: vendorFiles,
  outputFile: '/vendor.js'
});

if (env === 'production') {
  appJS = uglifyJavaScript(appJS, {
    mangle: false,
    compress: false
  });
}

appJS = new Funnel(appJS, {destDir: 'js'});
vendorJS = new Funnel(vendorJS, {destDir: 'js'});

module.exports = mergeTrees([appJS, vendorJS], {overwrite: true});
