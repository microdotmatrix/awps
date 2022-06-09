/*
 * AWPS uses Laravel Mix
 *
 * Check the documentation at
 * https://laravel-mix.com/
 */

let mix = require( 'laravel-mix' );
require('@tinypixelco/laravel-mix-wp-blocks');

const tailwindcss = require('tailwindcss');

// Autloading jQuery to make it accessible to all the packages, because, you know, reasons
// You can comment this line if you don't need jQuery.
mix.autoload({
	jquery: ['$', 'window.jQuery', 'jQuery'],
});

mix.setPublicPath( './assets/dist' );

// Compile assets.
mix.js('assets/src/scripts/app.js', 'assets/dist/js')
	.js('assets/src/scripts/admin.js', 'assets/dist/js')
	.js('assets/src/scripts/gutenberg.js', 'assets/dist/js');

mix.sass('assets/src/sass/style.scss', 'assets/dist/css')
	.sass( 'assets/src/sass/admin.scss', 'assets/dist/css' )
	.sass('assets/src/sass/gutenberg.scss', 'assets/dist/css');

mix.options({
	processCssUrls: false,
	postCss: [
		require('postcss-import'),
		require('autoprefixer'),
		require('tailwindcss'),
		tailwindcss('tailwind.config.js')
	],
	cssNano: { minifyFontValues: false }
});

mix.browserSync({
	proxy: 'http://wordup.wtf',
	files: [
		'views/**/*.twig',
		'assets/dist/**/*.(css|js)',
	],
	// Option to open in non default OS browser.
	// browser: "firefox",
	notify: false
});

mix.override(webpackConfig => {
	webpackConfig.module.rules.push(
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		})
});


// Add source map and versioning to assets in production environment.
if ( mix.inProduction() ) {
	mix.sourceMaps().version();
}
