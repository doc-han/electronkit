const sass = require('node-sass')
module.exports = function(grunt){

//config grunt
grunt.initConfig({
    clean: {
        build:['./sass/all.scss'],
        dev: ['./test/all.scss']
    },
    concat: {
        sass: {
            src: ['./sass/*.scss'],
            dest: './sass/all.scss'
        },
        dev: {
            src: [
                './sass/master.scss',
                './sass/linear.scss',
                './sass/layout.scss',
                './sass/button.scss',
                './sass/list.scss',
                './sass/text.scss',
                './sass/progress.scss',
                './sass/input.scss',
                './sass/header.scss',
                './sass/identifiers.scss'
            ],
            dest: './test/all.scss'
        }
    },
    sass: {
        build: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            files: {'./dist/electro.css':'./sass/all.scss'}
        },
        dev: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            files: {'./test/electro.css':'./test/all.scss'}
        }
    },
    watch: {
        changes: {
            files: ['./sass/*.scss'],
            tasks: ['build-all'],
            options: {
                spawn: false,
            }
        },
        dev: {
            files: ['./sass/*.scss','Gruntfile.js'],
            tasks: ['build-test'],
            options: {
                spawn: false,
            }
        }
    },
    cssmin: {
        options: {
          mergeIntoShorthands: false,
          roundingPrecision: -1
        },
        target: {
          files: {
            './dist/electro.min.css': ['./dist/electro.css']
          }
        }
      }
})

//load plugins
grunt.loadNpmTasks('grunt-contrib-concat')
grunt.loadNpmTasks('grunt-sass')
grunt.loadNpmTasks('grunt-contrib-watch')
grunt.loadNpmTasks('grunt-contrib-clean')
grunt.loadNpmTasks('grunt-contrib-cssmin')

//register events
grunt.registerTask('build-all',['clean:build','concat:sass','sass:build','cssmin'])
grunt.registerTask('build-test', ['clean:dev','concat:dev','sass:dev'])
}