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
                    {src: './src/reference_client.tpl', dest: './build/reference_client.ts'},
                    {src: './src/reference_server.tpl', dest: './build/reference_server.ts'}
                ]
            },
            assetsToDist: {
                files: [
                    {
                        src: '**',
                        expand: true,
                        dest: './dist/public/',
                        cwd: './src/public/'
                    },
                    {
                        src: './dist/spaceshipintrouble_client.js',
                        dest: './dist/public/js/spaceshipintrouble.js'
                    }
                ]
            },
            distClient: {
                src: './build/reference_client.ts',
                dest: './dist/include_sources_client.inc',
                options: {
                    process: function (content, srcPath) {
                        return "@import \"../src/lib/vendor/jsnlog.min.js\";\n"
                            +  "@import \"../src/lib/initializeLogger.js\";\n"
                            +  "@import \"../src/lib/vendor/threejs/three.js\";\n"
                            +  "@import \"../src/lib/vendor/threejs/Mirror.js\";\n"

                            +  "@import \"../src/lib/vendor/threejs/shaders/DigitalGlitch.js\";\n"
                            +  "@import \"../src/lib/vendor/threejs/shaders/DotScreenShader.js\";\n"
                            +  "@import \"../src/lib/vendor/threejs/shaders/CopyShader.js\";\n"
                            +  "@import \"../src/lib/vendor/threejs/EffectComposer.js\";\n"
                            +  "@import \"../src/lib/vendor/threejs/RenderPass.js\";\n"
                            +  "@import \"../src/lib/vendor/threejs/SavePass.js\";\n"
                            +  "@import \"../src/lib/vendor/threejs/ShaderPass.js\";\n"
                            +  "@import \"../src/lib/vendor/threejs/TexturePass.js\";\n"
                            +  "@import \"../src/lib/vendor/threejs/MaskPass.js\";\n"
                            +  "@import \"../src/lib/vendor/threejs/GlitchPass.js\";\n"
                            +  "@import \"../src/lib/vendor/threejs/FilmPass.js\";\n"
                            +  "@import \"../src/lib/vendor/threejs/DotScreenPass.js\";\n"
                            +  "@import \"../src/lib/vendor/threejs/BokehPass.js\";\n"
                            +  "@import \"../src/lib/vendor/threejs/BloomPass.js\";\n"

                            +  "@import \"../src/lib/vendor/socket.io.js\";\n"
                            +  "@import \"../src/lib/vendor/zepto.js\";\n"
                            +  "@import \"../src/lib/vendor/lodash.js\";\n"
                            +  "@import \"../src/lib/vendor/box2dweb.js\";\n"
                            +  "@import \"../src/lib/vendor/hammer.js\";\n"
                            +  "@import \"../src/lib/vendor/promise.js\";\n"
                            +  "@import \"../src/lib/vendor/stats.js\";\n"
                            +  "@import \"../assets/engine/fonts/helvetiker_regular.typeface.js\";\n"
                            + content.replace(/\/\/\/ <reference path="\.\.\/(.*).ts" \/>/g, "@import \"../build/client/$1.js\";")
                                      .replace(/(@import \".*\.d\.js\";)/g, "");

                    }
                }
            },
            distServer: {
                src: './build/reference_server.ts',
                dest: './dist/include_sources_server.inc',
                options: {
                    process: function (content, srcPath) {
                        return content.replace(/\/\/\/ <reference path="\.\.\/(.*).ts" \/>/g, "@import \"../build/server/$1.js\";")
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
            distClient: {
                src: 'dist/include_sources_client.inc',
                dest: 'dist/spaceshipintrouble_client.js'
            },
            distServer: {
                src: 'dist/include_sources_server.inc',
                dest: 'dist/spaceshipintrouble_server.js'
            }
        },
        ts: {
            buildClient: {
                src: ["src/Client/**/*.ts", "src/Common/**/*.ts"],
                reference: "./build/reference_client.ts",
                outDir: './build/client',
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
            buildServer: {
                src: ["src/Server/**/*.ts", "src/Common/**/*.ts"],
                reference: "./build/reference_server.ts",
                outDir: './build/server',
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
            watchClient: {
                src: ["src/Client/**/*.ts", "src/Common/**/*.ts"],
                reference: "./build/reference_client.ts",
                outDir: './build/client',
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
            watchServer: {
                src: ["src/Server/**/*.ts", "src/Common/**/*.ts"],
                reference: "./build/reference_server.ts",
                outDir: './build/server',
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


    grunt.registerTask('default', ['clean:build', 'copy:build', 'ts:buildClient', 'ts:buildServer']);
    grunt.registerTask('dist', ['clean:dist', 'default', 'copy:distClient', 'copy:distServer', 'import:distClient', 'import:distServer', 'copy:assetsToDist']);

    grunt.registerTask('dev', ['default', 'ts:watchClient', 'ts:watchServer']);

};