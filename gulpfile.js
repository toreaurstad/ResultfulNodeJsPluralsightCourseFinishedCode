const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const gulpMocha = require('gulp-mocha');
const env = require('gulp-env');
const supertest = require('supertest');

gulp.task('default', function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    })
        .on('start', function () {
            console.log('Starting gulp task')
        })
        .on('restart'), function () {
            console.log('Restarting');
        };

});

gulp.task('test', function () {
    env({ vars: { ENV: 'Test' } });
    gulp.src('tests/*.js', { read: false }).pipe(gulpMocha({ reporter: 'nyan' })).once('end', () => console.log('All done'));
    console.log('All tests run');
});
