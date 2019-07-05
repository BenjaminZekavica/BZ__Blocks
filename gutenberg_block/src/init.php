<?php
/**
 * Blocks Initializer
*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function a11y_input_cgb_block_assets() {
	wp_enqueue_style(
		'a11y_input-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), 
		array( 'wp-editor' )
	);
}
add_action( 'enqueue_block_assets', 'a11y_input_cgb_block_assets' );


function a11y_input_cgb_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'a11y_input-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-compose', 'wp-components', 'wp-i18n'),
		true 
	);
	// Styles.
	wp_enqueue_style(
		'a11y_input-cgb-block-editor-css', 
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), 
		array( 'wp-edit-blocks' ) 
	);
} 
add_action( 'enqueue_block_editor_assets', 'a11y_input_cgb_editor_assets' );



function bzblocks_script_frontend() {

	// WP INCLUDES -> PATH 
	$bzblockIncludesMain     =  includes_url(); 

	// CONCAT FILE URI 
	$bzblockIncludesReact 	 = 	$bzblockIncludesMain . 'js/dist/vendor/react.min.js';
	$bzblockIncludesReactDom = 	$bzblockIncludesMain . 'js/dist/vendor/react-dom.min.js';

	// Include REACT 
	wp_register_script('bz_react', $bzblockIncludesReact );
	wp_enqueue_script('bz_react');

	wp_register_script('bz_react_dom', $bzblockIncludesReactDom );
	wp_enqueue_script('bz_react_dom');

}
add_action( 'wp_enqueue_scripts', 'bzblocks_script_frontend' );




// Register Block Category
function pr_gutenberg_modul_category( $categories, $post ) {
    
    // Add Category 
    return array_merge(
		array(
            array(
                'slug'  => 'bzblocks',
				'title' => 'BZ Blocks'
            ),
        ),
        $categories
    );
}
add_filter( 'block_categories', 'pr_gutenberg_modul_category', 10, 2 );


/*Register WordPress  Gutenberg CPT */
function cw_post_type() {

    register_post_type( 'portfolio',
        // WordPress CPT Options Start
        array(
            'labels' => array(
				'name'			=> __( 'Portfolio' ),
				'singular_name' => __( 'Portfolio' )
            ),
            'has_archive' 	=> true,
            'public' 		=> true,
            'rewrite' 		=> array('slug' => 'portfolio'),
            'show_in_rest'  => true,
            'supports' 		=> array('title', 'editor', 'thumbnail', 'excerpt')
        )
    );
}

add_action( 'init', 'cw_post_type' );

// Load Files
include( plugin_dir_path( __FILE__ ) . 'block/artikel-tile/portfolio-auflistung.php');