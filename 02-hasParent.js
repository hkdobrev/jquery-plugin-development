

    $.fn.hasParent = function( parent ) {
        return this.closest( parent ).length > 0;
    };

    // Usage
    // ==========

    $( 'button' ).hasParent( '#form-validated' );

    // ------------------

    $( 'em' ).hasParent( $( 'h1,h2,h3' ) );