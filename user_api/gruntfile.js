module.exports = function(grunt) {

          var buildFiles = ['gruntfile.js',  'app.js'];

          grunt.loadNpmTasks('grunt-complexity');

          // Project configuration.
          grunt.initConfig({
              pkg: '<json:package.json>',
              complexity: {
                generic: {
                    src: ['./models/*.js','./controllers/*.js'],
                    exclude: ['gruntfile.js'],
                    options: {
                        breakOnErrors: true,

                        errorsOnly: false,               // show only maintainability errors
                        cyclomatic: [3, 7, 12],          // or optionally a single value, like 3
                        halstead: [8, 13, 20],           // or optionally a single value, like 8
                        maintainability: 100,
                        hideComplexFunctions: false,     // only display maintainability
                        broadcast: false                 // broadcast data over event-bus
                    }
                }
            }

          });

          // Production task.
          grunt.registerTask('default', 'complexity');

          console.log('\nGrunt executed at: ' + new Date() + '.\n');
      };
