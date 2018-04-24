var compress_images = require('compress-images'), INPUT_path_to_your_images, OUTPUT_path;
var Fontmin = require('fontmin');
var exec = require('child_process').exec,child,child2;

 /*Image minification*/
    INPUT_path_to_your_images = 'public/assets/images/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}';
    OUTPUT_path = 'build/assets/images/';
    
    child = exec('rm -rf build/assets/images',function(err,out) { 
  		console.log(out); err && console.log(err); 
	});
	child2 = exec('rm -rf build/assets/fonts',function(err,out) { 
  		console.log(out); err && console.log(err); 
	});

    compress_images(INPUT_path_to_your_images, OUTPUT_path, {compress_force: false, statistic: true, autoupdate: true}, false,
                                                {jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
                                                {png: {engine: 'pngquant', command: ['--quality=20-50']}},
                                                {svg: {engine: 'svgo', command: '--multipass'}},
                                                {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}}, function(){
    });

/*Font minification*/
   var fontmin = new Fontmin()
    .src('public/assets/fonts/**/*.ttf')
    .dest('build/assets/fonts/')
    .use(Fontmin.ttf2woff({
        deflate: true           // deflate woff. default = false
    }));
 
fontmin.run(function (err, files) {
    if (err) {
        console.log(err);
    }
 
    console.log("Font file minified");
});