<?php 
// Dynamic Block
register_block_type('bzblocks/articletile', array(
        'render_callback' => 'prwp_articletile',
        'attributes'      => array(

            'align'       => array(
                'type'    => 'string',
                'default' => 'center',
            ), 
            
            'anzahlposts' => array(
                'type'    => 'number', 
                'default' => 3
            ), 

            'paginationdisplay' => array(
                'type'    => 'boolean', 
                'default' => true
            )
        )
    )
);

function prwp_articletile( $attributes ) {
    ob_start();

    // Define Variables
    $NumberPosts = $attributes['anzahlposts'];
    $Pagination  = $attributes['paginationdisplay'];
    $paged       = get_query_var('page') ? get_query_var('page') : 1;
    
    $args = array(
        'post_type'            => array( 'portfolio' ),
        'paged'                => $paged,
        'posts_per_page'       => $NumberPosts
    );

    $prwp_portfolio 	= new WP_Query( $args );
    $max_pages = $prwp_portfolio->max_num_pages;

    if ( $prwp_portfolio->have_posts() ) {
        echo '<div class="page-section-articletile flexbox flex-wrap '. 'align'.$attributes['align'] .' ">';

            while ( $prwp_portfolio->have_posts() ) {
                $prwp_portfolio->the_post();
                global $post; ?>

                    <div class="page-section-articletile__item global-margin">
                        <div class="page-section-articletile__item--image">
                            <img src="<?= get_the_post_thumbnail_url($post, 'large') ?>" /	>
                        </div>
                        <h3 class="page-section-articletile__item--headline">
                            <a href="<?= get_permalink($post->ID); ?>">
                                <?= $post->post_title; ?>
                            </a>
                        </h3>
                        <div class="page-section-articletile__item--excerpt global-padding">
                            <?= wp_trim_words( $post->post_content, 39 ); ?>
                        </div>
                        <a class="wp-block-button__link has-background has-strong-blue-background-color page-section-articletile__item--readmore" href="<?= get_permalink($post->ID); ?>">
                            weiterlesen
                        </a>
                    </div>
                
                <?php
            }

        echo '</div>';

        if( $Pagination === true  ) { ?>
            <div class="pagination">
                <div class="pagLinks">
                    <ul class="pagination">
                        <li class="has-strong-blue-background-color <?php echo ( $paged == 1 ? 'disabled' : '' ); ?>"><a href="<?php echo ( $paged != 1 ? esc_url( home_url( '/' ) ) . 'page/' . ( $paged - 1 ) : '' ); ?>#uebersicht"><?php echo 'vor'; ?></a></li>
                        <?php 
                            $anzLinks = 5; 
                            $range = floor( ( $paged - 1 ) / $anzLinks ) + 1;
                            $maxRange = floor( ( $max_pages - 1 ) / $anzLinks ) + 1;
                            $start = ( $range - 1 ) * $anzLinks + 1;
                            $ende = $range * $anzLinks;

                            if( $max_pages < $ende ){ 
                                $ende = $max_pages; 
                            }

                            if( $range > 1 ){ 
                                echo '<li class="has-strong-blue-background-color"><a href="'. esc_url( home_url( '/' ) ) . 'page/' . max( 1, $start - 1 ) . '#uebersicht">...</a></li>';
                            }

                            for( $i = $start; $i <= $ende; $i++ ){
                                
                                if($i == $paged){ 
                                    $aktiv = '<li class="has-strong-blue-background-color active">'; 
                                } else { 
                                    $aktiv = '<li class="has-strong-blue-background-color">'; 
                                }

                                echo $aktiv . '<a href="'. esc_url( home_url( '/' ) ) . 'page/' . $i . '#uebersicht">'.$i.'</a></li>';
                            }
                            
                            if($range > 0 && $range < $maxRange) { 
                                echo '<li class="has-strong-blue-background-color"><a href="'. esc_url( home_url( '/' ) ) . 'page/' . ($ende+1).'#uebersicht">...</a></li>'; 
                            }
                        ?>
                        <li class="has-strong-blue-background-color <?php echo ( $paged == $max_pages ? "disabled" : '' ); ?>"><a href="<?php echo ( $paged < $max_pages ? esc_url( home_url( '/' ) ) . 'page/' . ( $paged + 1 ) : '' ); ?>#uebersicht"><?php echo 'nächste'; ?></a></li>
                    </ul>
                </div>
            </div>
   <?php }

    }
    wp_reset_postdata();

    $ret = ob_get_contents();
           ob_end_clean();

    return $ret;
}
