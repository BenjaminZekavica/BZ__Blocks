<?php
/**
 * Plugin Name: BZ Blocks Block
 * Description: Blocks fuer meine Website
 * Author: Benjamin Zekavica
 * Version: 1.0.0
 *
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';