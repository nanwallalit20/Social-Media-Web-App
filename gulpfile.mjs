import gulp from 'gulp'

import cssnano from 'gulp-cssnano'
import rev  from 'gulp-rev';
import uglify from 'gulp-uglify'
import imagemin from 'gulp-imagemin'
import {deleteSync} from 'del'


gulp.task('css',async function(done){
    console.log('minifying css....');
    gulp.src('./views/css/**/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('./views/css'))


      gulp.src('./views/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'))
    done();
})
gulp.task('js',async function(done){
    console.log('minifying js....');
    gulp.src('./views/js/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'))
    done();
})
gulp.task('images',async function(done){
    console.log('minifying images....');
    gulp.src('./views/**/*.+(jpeg|png|jpeg|svg|gif)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'))
    done();
})
gulp.task('clean:assets',async function(done){
    deleteSync('./public/assets')
    done();
})
gulp.task('build',gulp.series('clean:assets','js','css','images'),function(done){
    console.log('building assests...')
    done();
})