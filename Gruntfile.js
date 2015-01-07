module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-ts");

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            build: {
                files: [
                    {src: './src/debug_loader.js', dest: './build/debug_loader.js'}
                ]
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
            },
            dist: {
                src: ["src/**/*.ts"],
                out: './dist/spaceshipintrouble.js',
                reference: "./dist/reference.ts",
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
    grunt.registerTask('dist', ['clean:dist', 'ts:dist']);

    grunt.registerTask('dev', ['default', 'ts:watch']);

};