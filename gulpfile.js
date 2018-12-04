
const source = {
                    js: "js/src/*.js",
                    less: "less/style.less",
                    watchless: "less/**/*.less",
                    jpg: "assets/jpg/*.jpg",
                    png: "assets/png/*.png",
                },

distribution =  {
                    js: "dist/js",
                    css: "dist/css",
                    maps: "maps",
                    assets: "assets/webp/"
                };

const   gulp = require('gulp'),
        path = require('path'),
        less = require('gulp-less'),
        map = require('gulp-sourcemaps'),
        babel = require('gulp-babel'),
        exReplace = require('gulp-ext-replace'),
        webp = require('imagemin-webp'),
        imagemin = require('gulp-imagemin'),
        bSync = require('browser-sync'),
        prefix = require('less-plugin-autoprefixer'),
        cleanCss = require('gulp-clean-css'),
        rename = require('gulp-rename'),
        clone = require('gulp-clone'),
        lessPrefix = new prefix({
                        browsers: ['last 2 versions']
                     });
bSync.create();

gulp.task('less', () => {
    gulp.src(source.less)
        .pipe(map.init())
        .pipe(less({
            strictMath: true,
            strictUnits: true,
            path: [path.join(__dirname, 'css', 'includes')],
            plugins: [
                    lessPrefix
            ],
            install: function(less, pluginManager) {},
            setOptions: function(argumentString) {},
            printUsage: function() {},
            minVersion: [2, 0, 0],
            env: "development"
        }).on('error', function(err) {
            console.log(err);
        }))
        .pipe(map.write(distribution.maps))
        .pipe(gulp.dest(() => {
                return distribution.css
        }))
        .pipe(bSync.stream())
})

gulp.task('minifyCss', () => {
        gulp.src("css/style.css")
            .pipe(clone())
            .pipe(cleanCss({
                    debug: true,
                    compatability: "*"
            }, (details) => {
                console.log(`${details.name}: ${details.stats.originalSize}`);
                console.log(`${details.name}: ${details.stats.minifiedSize}`);
            }))
            .pipe(rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest(() => {
                return distribution.css
            }))
})

gulp.task('ejs', () => {
    gulp.src(source.js)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest(() => {
            return distribution.js
        }))
        .on('error', function(err) {
                console.log(err);
        })
})

gulp.task("WebP", () => {
    return gulp.src([source.png, source.jpg])
                .pipe(exReplace(".webp"))
                .pipe(imagemin([~webp({
                    quality: 75
                    })]))
                .on('error', function(err) {
                    console.log(err);
                })
                .pipe(gulp.dest(() => {
                    return distribution.assets
                }))
});

gulp.task('server', ['WebP', 'less', 'ejs', 'minifyCss'], () => {
    bSync.init({
        localOnly: true,
        codeSync: true,
        server: {
            baseDir: "./"
        }
    });
    gulp.watch([
            distribution.assets,
            distribution.js,
            distribution.css,
            source.js,
            source.watchless,
            source.png,
            source.jpg
        ], [
            'less',
            'ejs',
            'WebP',
            'minifyCss'
        ],
        bSync.reload),
        gulp.watch("*.html").on('change', () => bSync.reload)
});

gulp.task('default', ['server']);



