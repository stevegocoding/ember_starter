module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-broccoli-fc');

  grunt.initConfig({
    broccoli: {
      dev: {
        dest: 'public/assets/',
        config: 'Brocfile.js'
      }
    }
  });
  
  // Default task.
  grunt.registerTask('default', 'build:debug');
  grunt.registerTask('watch', 'build:watch');
  
  grunt.registerTask('build', ['build:debug']);
  grunt.registerTask('build:debug', ['broccoli:dev:build']);
  grunt.registerTask('build:watch', ['broccoli:dev:watch']);
};
