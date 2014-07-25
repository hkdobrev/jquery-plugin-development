function MyAwesomePlugin () {
    
}

MyAwesomePlugin.prototype.open = function ( option1, option2) {
    
};

$.fn.myAwesomePlugin = function ( options ) {

    var isMethodCall = typeof options === "string",
        args = slice.call( arguments, 1 ),
        returnValue = this;

    if ( isMethodCall ) {

        this.each(function() {
            var methodValue,
                instance = $.data( this, 'myAwesomePlugin' );
            if ( !instance ) {
                return $.error( "cannot call methods prior to initialization; " +
                    "attempted to call method '" + options + "'" );
            }
            if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
                return $.error( "no such method '" + options + "'" );
            }
            methodValue = instance[ options ].apply( instance, args );
            if ( methodValue !== instance && methodValue !== undefined ) {
                returnValue = methodValue && methodValue.jquery ?
                    returnValue.pushStack( methodValue.get() ) :
                    methodValue;
                return false;
            }
        });

    } else {
        this.each(function() {
            var instance = $.data( this, 'myAwesomePlugin' );
            if ( instance ) {
                instance.option( options || {} )._init();
            } else {
                $.data( this, 'myAwesomePlugin', new MyAwesomePlugin( options, this ) );
            }
        });
    }

    return returnValue;
};


$('a').myAwesomePlugin('open', 'a', 'b');