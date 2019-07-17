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
            src: ['./sass/*.scss'],
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
            files: ['./sass/*.scss'],
            tasks: ['build-test'],
            options: {
                spawn: false,
            }
        }
    }
})

//load plugins
grunt.loadNpmTasks('grunt-contrib-concat')
grunt.loadNpmTasks('grunt-sass')
grunt.loadNpmTasks('grunt-contrib-watch')
grunt.loadNpmTasks('grunt-contrib-clean')

//register events
grunt.registerTask('build-all',['clean:build','concat:sass','sass:build'])
grunt.registerTask('build-test', ['clean:dev','concat:dev','sass:dev'])

}