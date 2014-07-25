
    $.fn.colourify = function () {
        this.css('color', 'red');
    };

    $('a').colourify();

























    // Colourize those elements!
    $.fn.colourify = function() {
        // `this` is a jQuery instance (not a DOM node!)
        return this.css( 'color', 'red' );
    };

    // Usage
    // ==========

    $( 'a' ).colourify().addClass('sdfs');