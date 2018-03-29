<?php

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php') ) . '</a></p></div>';
	});
	
	add_filter('template_include', function($template) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});
	
	return;
}

Timber::$dirname = array('templates', 'views');

class StarterSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_action('wp_enqueue_scripts', array($this, 'add_theme_styles'));
		parent::__construct();
	}

	/**
	 * Add any additional style enqueues in this metod
	 */

	function add_theme_styles(){
		$theme = wp_get_theme();
		wp_enqueue_style( 'theme-styles', get_template_directory_uri() . '/public/build/css/styles.css', null, $theme->get( 'Version' ), 'all' );
		wp_enqueue_script( 'theme-js', get_template_directory_uri() . '/public/build/app.js', null, $theme->get( 'Version' ), true );
	}

	/**
	 * Add to the global context here.
	 * ie. ACF Options
	 */

	function add_to_context( $context ) {
		$context['menu'] = new TimberMenu();
		$context['site'] = $this;
		return $context;
	}

	/**
	 * Adds custom function to get svg icons to Twig
	 */

	function get_icon($file) {
		$theme_url = get_theme_file_path();
		$file = $theme_url.'/public/build/_images/'.$file.'.svg';
		if(!file_exists(file)) {
			return $file.' Does not seem to be a real thing, dbl chiggity check yo file name';
		}
		$icon = file_get_contents($theme_url.'/public/build/_images/'.$file.'.svg');
		return $icon;
	}

	/**
	 * Adds custom function to get Images from the theme file to Twig
	 */

	function get_image_from_server($file) {
		$theme_url = get_theme_file_uri();
		$image = '<img src="'.$theme_url.'/public/build/_images/'.$file.'" />';
		return $image;
	}


	function add_to_twig( $twig ) {
		/* this is where you can add your own functions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFunction(new Timber\Twig_Function( 'get_image_from_server', array($this, 'get_image_from_server') ));
		$twig->addFunction( new Timber\Twig_Function( 'get_icon', array($this, 'get_icon') ) );
		return $twig;
	}

}

new StarterSite();

/**
 *
 * DO NOT WRITE PHP BELOW HERE
 *
 */