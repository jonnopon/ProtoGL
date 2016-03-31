module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ''
            },
            js: {
                src: ['lib/**/*.js', 'src/**/*.js'],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*HOPE THIS WORKS*/'
            },
            js: {
                files: {
                    ['dist/js/<%= pkg.name %>.js']: ['dist/js/<%= pkg.name %>.js']
                }
            }
        },
        copy: {
            dev_html: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['*-dev.html'],
                    dest: 'dev/'
                }]
            },
            dev_jsApp: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['js/**'],
                    dest: 'dev/'
                }]
            },
            dev_jsLib: {
                files: [{
                    expand: true,
                    src: ['lib/**'],
                    dest: 'dev/'
                }]
            },
            dev_css: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['css/**'],
                    dest: 'dev/'
                }]
            },
            dev_appStatic: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['res/**'],
                    dest: 'dev/'
                }]
            },
            dev_libStatic: {
                files: [{
                    expand: true,
                    cwd: 'lib/protogl-base/text/',
                    src: ['font.png'],
                    dest: 'dev/res/img/'
                }]
            },

            dist_html: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['*-dist.html'],
                    dest: 'dist/'
                }]
            },
            dist_css: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['css/**'],
                    dest: 'dist/'
                }]
            },
            dist_appStatic: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['res/**'],
                    dest: 'dist/'
                }]
            },
            dist_libStatic: {
                files: [{
                    expand: true,
                    cwd: 'lib/protogl-base/text/',
                    src: ['font.png'],
                    dest: 'dist/res/img/'
                }]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            jsApp: {
                files: ['src/**/*.js'],
                tasks: ['copy:dev_jsApp']
            },
            jsLib: {
                files: ['lib/**/*.js'],
                tasks: ['copy:dev_jsLib']
            },
            html: {
                files: ['src/*.html'],
                tasks: ['copy:dev_html']
            },
            css: {
                files: ['src/**/*.css'],
                tasks: ['copy:dev_css']
            },
            appStatic: {
                files: ['src/res/**'],
                tasks: ['copy:dev_appStatic']
            },
            libStatic: {
                files: ['lib/protogl-base/text/font.png'],
                tasks: ['copy:dev_libStatic']
            }
        },
        'http-server': {
            dev: {
                root: 'dev/',
                port: 8080,
                runInBackground: true,
                openBrowser: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-http-server');

    grunt.registerTask('default', []);
    grunt.registerTask(
        'dev', [
            'copy:dev_html',
            'copy:dev_jsApp',
            'copy:dev_jsLib',
            'copy:dev_css',
            'copy:dev_appStatic',
            'copy:dev_libStatic',
            'http-server',
            'watch'
        ]
    );
    grunt.registerTask(
        'dist', [
            'concat',
            'uglify',
            'copy:dist_html',
            'copy:dist_css',
            'copy:dist_appStatic',
            'copy:dist_libStatic',
        ]
    );
};