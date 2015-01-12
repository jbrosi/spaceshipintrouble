module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-import');
    grunt.loadNpmTasks("grunt-ts");

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            build: {
                files: [
                    {src: './src/debug_loader.js', dest: './build/debug_loader.js'},
                    {src: './src/reference.tpl', dest: './build/reference.ts'}
                ]
            },
            dist: {
                src: './build/reference.ts',
                dest: './dist/include_sources.inc',
                options: {
                    process: function (content, srcPath) {
                        return content.replace(/\/\/\/ <reference path="\.\.\/(.*).ts" \/>/g, "@import \"../build/$1.js\";")
                                      .replace(/(@import \".*\.d\.js\";)/g, "");
                    }
                }
            }
        },
        import: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
                footer: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
                separator: ''
            },
            dist: {
                src: 'dist/include_sources.inc',
                dest: 'dist/spaceshipintrouble.js'
            }
        },
        ts: {
            build: {
                src: ["src/**/*.ts"],
                reference: "./build/reference.ts",
                outDir: './build',
                //watch: "core",

                options: {
                    // 'es3' (default) | 'es5'
                    target: 'es5',
                    // 'amd' (default) | 'commonjs'
                    module: 'commonjs',
                    // true (default) | false
                    sourceMap: true,
                    // true | false (default)
                    declaration: true,
                    // true (default) | false
                    removeComments: true
                }
            },
            watch: {
                src: ["src/**/*.ts"],
                reference: "./build/reference.ts",
                outDir: './build',
                watch: "src",

                options: {
                    // 'es3' (default) | 'es5'
                    target: 'es5',
                    // 'amd' (default) | 'commonjs'
                    module: 'commonjs',
                    // true (default) | false
                    sourceMap: true,
                    // true | false (default)
                    declaration: true,
                    // true (default) | false
                    removeComments: true
                }
            }
        },
        clean: {
            build: ["./build"],
            dist: ["./dist"]
        }

    });


    grunt.registerTask('default', ['clean:build', 'copy:build', 'ts:build']);
    grunt.registerTask('dist', ['clean:dist', 'default', 'copy:dist', 'import:dist']);

    grunt.registerTask('dev', ['default', 'ts:watch']);

};