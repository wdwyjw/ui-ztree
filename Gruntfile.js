// Generated on 2015-12-08 using generator-angular 0.14.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {});

    // Configurable paths for the application
    var appConfig = {
        dist: 'dist',
        example: 'example'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json']
            },
            js: {
                files: ['src/{,*/}*.js'],
                tasks: ['copy:example'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'newer:jscs:test', 'karma']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.example %>/{,*/}*.html', '<%= yeoman.example %>/scripts/app.js', '<%= yeoman.example %>/views/{,*/}*.html'
                ]
            }
        },
        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.example)];
                    }
                }
            }
        },
        // Make sure there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    'src/{,*/}*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },
        // Make sure code styles are up to par
        jscs: {
            options: {
                config: '.jscsrc',
                verbose: true
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/scripts/{,*/}*.js'
                ]
            },
            test: {
                src: ['test/spec/{,*/}*.js']
            }
        },
        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git{,*/}*',
                        '<%= yeoman.example %>/libs/',
                        '<%= yeoman.example %>/css/'
                    ]
                }]
            }
        },
        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                javascriptsDir: 'src',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {}
        },
        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/beanext-ui-ztree.min.js'
                ]
            }
        },
        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            js: ['<%= yeoman.dist %>/beanext-ui-ztree.min.js'],
            options: {
                assetsDirs: [
                    '<%= yeoman.dist %>'
                ]
            }
        },
        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        uglify: {
            dist: {
                files: [{
                    src: 'src/beanext-ui-ztree.js',
                    dest: '<%= yeoman.dist %>/beanext-ui-ztree.min.js'
                }]
            }
        },
        concat: {
            dist: {},
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/ztree/js/',
                    dest: '<%= yeoman.dist %>/ztree/scripts',
                    src: [
                        'jquery.ztree.all-3.5.js',
                        'jquery.ztree.exhide-3.5.js'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/ztree/css/zTreeStyle/',
                    dest: '<%= yeoman.dist %>/ztree/css',
                    src: [
                        '{,*/}*.css', 'img/{,*/}*.{png,gif}'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'src',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.js'
                    ]
                }]
            },
            example: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src',
                    dest: '<%= yeoman.example %>/libs/',
                    src: '*.js'
                }]
            }
        },
        // Run some tasks in parallel to speed up the build process
        concurrent: {
            test: [
                'compass'
            ],
            dist: [
                'compass:dist'
            ]
        },
        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        }
    });


    grunt.registerTask('test', [
        'concurrent:test',
        //'karma'
    ]);

    grunt.registerTask('serve', [
        'build', 'connect:livereload', 'watch'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'concat',
        'copy:dist',
        'uglify',
        'usemin',
        //'filerev'
        'copy:example'
    ]);

    grunt.registerTask('default', [
        /*'newer:jshint',
         'newer:jscs',*/
        'test',
        'build'
    ]);
};
