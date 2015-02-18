module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-broccoli-fc');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    clean: ["public/assets"],
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
