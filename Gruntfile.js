module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-broccoli-fc');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bowercopy');

  grunt.initConfig({
    clean: ["public/assets"],
    
    /**
     * Bowercopy: copy the required assets to proper directories
     **/
    bowercopy: {
      options: {
        // Bower components folder will be removed afterwards 
        clean: false
      },
      stylesheets_js: {
        options: {
          destPrefix: 'vendor/assets'
        },
        files: {
          // Bootstrap
          'stylesheets/bootstrap': 'bootstrap-sass-official/assets/stylesheets/_bootstrap.scss',
          'stylesheets/bootstrap/bootstrap': 'bootstrap-sass-official/assets/stylesheets/bootstrap',
          'javascripts/bootstrap-min.js': 'bootstrap-sass-official/assets/javascripts/bootstrap.min.js',
          
          // Font-awesome
          'stylesheets/font-awesome': 'font-awesome/scss/*.scss',

          // jQuery
          'javascripts/jquery-min.js': 'jquery/dist/jquery.min.js'
        }
      },
      fonts: {
        options: {
          destPrefix: 'public/assets/fonts'
        },
        files: {
          'public/assets/fonts': 'font-awesome/fonts',
        }
      }
    },
    broccoli: {
      dev: {
        env:  'development',
        dest: 'public/assets/',
        config: 'Brocfile.js'
      },
      prod: {
        env:  'production',
        dest: 'public/assets/',
        config: 'Brocfile.js'
      }
    }
  });
  
  // Default task.
  grunt.registerTask('default', 'build:debug');
  grunt.registerTask('watch', 'build:watch');
  grunt.registerTask('clear', 'build:clean');

  grunt.registerTask('build', ['build:debug']);
  grunt.registerTask('build:debug', ['clear', 'broccoli:dev:build']);
  grunt.registerTask('build:prod', ['clear', 'broccoli:prod:build']);
  grunt.registerTask('build:watch', ['broccoli:dev:watch']);
  grunt.registerTask('build:clean', ['clean']);
};
