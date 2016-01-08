module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';'
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
            html: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['*.html'],
                    dest: 'dist/'
                }]
            },
            css: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['css/**'],
                    dest: 'dist/'
                }]
            },
            appStatic: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['res/**'],
                    dest: 'dist/'
                }]
            },
            libStatic: {
                files: [{
                    expand: true,
                    cwd: 'lib/protoGL-base/',
                    src: ['res/**'],
                    dest: 'dist/'
                }]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ['src/**/*.js', 'lib/**/*.js'],
                tasks: ['concat']
            },
            html: {
                files: ['src/*.html'],
                tasks: ['copy:html']
            },
            css: {
                files: ['src/**/*.css'],
                tasks: ['copy:css']
            },
            appStatic: {
                files: ['src/res/**'],
                tasks: ['copy:appStatic']
            },
            libStatic: {
                files: ['lib/res/**'],
                tasks: ['copy:libStatic']
            }
        },
        'http-server': {
            'dev': {
                root: 'dist/',
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
            'concat',
            'copy:html',
            'copy:css',
            'copy:appStatic',
            'copy:libStatic',
            'http-server',
            'watch'
        ]
    );
    grunt.registerTask(
        'dist', [
            'concat',
            'uglify',
            'copy:html',
            'copy:css',
            'copy:appStatic',
            'copy:libStatic'
        ]
    );
};