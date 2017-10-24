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
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action('wp_enqueue_scripts', array($this, 'load_theme_files'));
		parent::__construct();
	}

	function register_post_types() {
		//this is where you can register custom post types
	}

	function register_taxonomies() {
		//this is where you can register custom taxonomies
	}

	function get_icon($file) {
		$theme_url = get_theme_file_path();
		$icon = file_get_contents($theme_url.'/public/build/_images/'.$file.'.svg');
		return $icon;
	}

	function get_image_from_server($file) {
		$theme_url = get_theme_file_uri();
		$image = '<img src="'.$theme_url.'/public/build/_images/'.$file.'" />';
		return $image;
	}


	function add_theme_styles(){
		$theme = wp_get_theme();
		wp_enqueue_style( 'theme-styles', get_template_directory_uri() . '/public/build/css/style.css', null, $theme->get( 'Version' ), 'all' );
		wp_enqueue_script( 'theme-js', get_template_directory_uri() . '/public/build/js/js', null, $theme->get( 'Version' ), true );
	}

	function add_to_context( $context ) {
		$context['menu'] = new TimberMenu();
		$context['site'] = $this;
		return $context;
	}

	function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
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
