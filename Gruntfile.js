module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      dev: {
        options: {
          file: 'server/server.js',
          args: ['dev'],
          ignoredFiles: ['README.md', 'node_modules/**'],
          watchedExtensions: ['js'],
          watchedFolders: ['tests'],
          debug: false,
          delayTime: 1,
          env: {
            PORT: '1337'
          },
          cwd: __dirname
        }
      },
    },
    requirejs: {
      mainJS: {
        options: {
          baseUrl: "public/js/",
          paths: {
            "desktop": "app/config/Init"
          },
          wrap: true,
          name: "libs/almond/almond",
          preserveLicenseComments: false,
          optimize: "uglify",
          mainConfigFile: "public/js/app/config/Init.js",
          include: ["desktop"],
          out: "public/js/app/config/Init.min.js"
        }
      },
      mainCSS: {
        options: {
          optimizeCss: "standard",
          cssIn: "./public/css/app.css",
          out: "./public/css/app.min.css"
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'public/js/app/**/*.js', '!public/js/app/**/*min.js'],
      options: {
        globals: {
          jQuery: true,
          console: false,
          module: true,
          document: true
        }
      }
    },
    shell: {
      copyBootstrapCSS: {
        command: 'cp ./public/js/libs/bootstrap/dist/css/bootstrap.css ./public/css/bootstrap.css'
      },
      copyFontAwesomeCSS: {
        command: 'cp ./public/js/libs/font-awesome/css/font-awesome.css ./public/css/font-awesome.css && cp ./public/js/libs/font-awesome/css/font-awesome-ie7.css ./public/css/font-awesome-ie7.css'
      },
      copyFontAwesomeFonts: {
        command: 'cp -r ./public/js/libs/font-awesome/font/* ./public/font'
      },
      copyJQuery: {
        command: 'cp ./public/js/libs/jquery/dist/* ./public/js/libs/jquery/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('init', ['shell:copyBootstrapCSS', 'shell:copyFontAwesomeCSS', 'shell:copyFontAwesomeFonts', 'shell:copyJQuery','requirejs:mainJS', 'requirejs:mainCSS']);
  grunt.registerTask('build', ['requirejs:mainJS', 'requirejs:mainCSS']);
  grunt.registerTask('server', ['nodemon:dev']);
  grunt.registerTask('default', ['init', 'test', 'build']);

};
