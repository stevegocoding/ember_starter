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
var bowerTrees = ['bower_components'];

/**
 * Application
 **/
var publicTree = 'public';
var appTree = 'app/javascripts';
var appTranspiledFile = 'app_transpiled.js';

// Transpile ES6 to ES5
var appTranspiledTree = transpileES6(appTree, {
  formatter: 'bundle',
  output: appTranspiledFile,
});

// Concat vendor components
var appAndVendorTree = mergeTrees([appTranspiledTree].concat(bowerTrees));
var filesToConcat = [
  'ember/ember.js',
  'jquery/dist/jquery.js'
].concat(appTranspiledFile);

// debug(appAndVendorTree, {name: 'test'});

var appJS = concatFiles(appAndVendorTree, {
  inputFiles: filesToConcat,
  outputFile: '/app_bundle.js'
});

if (env === 'production') {
  appJS = uglifyJavaScript(appJS, {
    mangle: true,
    compress: true
  });
}

appJS = new Funnel(appJS, {destDir: 'js'});

module.exports = mergeTrees([appJS], {overwrite: true});
