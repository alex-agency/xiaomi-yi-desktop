'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env: {
            dev: {'NODE_ENV': 'development'},
            build: {'NODE_ENV': 'production'}
        },
        clean: {
            build: ['build/**/*']
        },
        browserify: {
            options: {
                transform: ['reactify']
            },
            dev: {
                src: ['src/app.js'],
                dest: 'build/js/app.js',
                options: {
                    browserifyOptions: {debug: true},
                    watch: 'watch'
                }
            },
            build: {
                src: ['src/app.js'],
                dest: 'build/js/app.js'
            }
        },
        sass: {
            dev: {
                options: {
                    outputStyle: 'expanded'
                },
                files: {
                    'build/css/main.css': 'resources/sass/main.scss'
                }
            },
            build: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'build/css/main.css': 'resources/sass/main.scss'
                }
            }
        },
        copy: {
            resources: {
                files: [
                    {expand: true, cwd: 'resources/fonts/', src: '**/*', dest: 'build/fonts/'},
                    {expand: true, cwd: 'resources/images/', src: '**/*', dest: 'build/images/'}
                ]
            }
        },
        watch: {
            sass: {
                files: [
                    'resources/sass/**/*.scss',
                    'resources/fonts/**',
                    'resources/images/**'
                ],
                tasks: ['sass:dev', 'copy:resources']
            }
        }
    });

    grunt.registerTask('default', ['env:dev' ,'browserify:dev', 'sass:dev', 'copy:resources', 'watch']);
    grunt.registerTask('build', ['env:build', 'clean:build', 'browserify:build', 'sass:build', 'copy:images']);
};
