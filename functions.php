<?php 

function theme_scripts() {
	wp_enqueue_style('scrollreveal-css','https://unpkg.com/scrollreveal', time(), 'all');
	wp_enqueue_style('sweetalert-css',get_template_directory_uri().'/assets/vendor/sweet-alert/sweetalert2.min.css', time(), 'all');
	wp_enqueue_style('theme-css', get_template_directory_uri().'/assets/css/theme.css',['sweetalert-css'], time(), 'all');

	wp_enqueue_script('scrollreveal-js', 'https://unpkg.com/scrollreveal@4.0.0/dist/scrollreveal.min.js', time(), true);
	wp_enqueue_script('imask-js', get_template_directory_uri().'/assets/vendor/imask/imask.min.js', time(), true);
	wp_enqueue_script('sweetalert-js', get_template_directory_uri().'/assets/vendor/sweet-alert/sweetalert2.min.js', time(), true);
	wp_enqueue_script('theme-js', get_template_directory_uri().'/assets/js/theme.js',['scrollreveal-js','imask-js','sweetalert-js'], time(), true);
}
add_action( 'wp_enqueue_scripts', 'theme_scripts' );

if( function_exists('acf_add_options_page') ) {
    
    acf_add_options_page(array(
        'page_title'    => 'Opções',
        'menu_title'    => 'Opções',
        'menu_slug'     => 'theme-options',
        'capability'    => 'edit_posts',
        'redirect'      => false
    ));
    
}

function remove_special_characters($string) {
    return preg_replace('/[^0-9]/', '', $string);
}