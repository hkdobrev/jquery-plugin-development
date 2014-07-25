(function ( window, $, undefined ) {

    var defaultOptions = {
        action: '',
        className: 'ajax-form',
        extension: '',
        progressClass: 'progress',
        method: 'submit',
        nested: false,
        fileInput: 'input[type="file"]',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    };

    function AjaxForm( options, element ) {
        this.element = $( element );
        this.options = $.dsprk.ajaxForm.defaultOptions;
        this.option( options );
        this._init( true );
    }

    $.extend( AjaxForm.prototype, {

        _init: function( initial ) {
            var _this, eventName;

            if (!initial) {
                return;
            }

            _this = this;
            eventName = this.options.method + '.ajaxForm' +
                (this.element.attr( 'class' ) || '').replace( ' ', '' );

            this.element
                .addClass( this.options.className )
                .on( eventName, function ( e ) {
                    e.preventDefault();
                    var form = $( this ),
                        formData = form.serializeObject(),
                        additionalData;

                    if (!form.is( 'form' ) && _this.options.nested) {
                        formData = form.find( ':input' ).serializeObject();
                    }

                    var action = _this.options.action || form.attr( 'action' ) ||
                        _this.element.data('action');

                    action = action.replace(
                        /(\.[a-z0-9]{1,5})?(\?.*)?$/,
                        function ( all, extension, query ) {
                            return _this.options.extension +
                                ( query ? query + '&' : '?' ) + '_ajax=true';
                        }
                    );

                    _this.option( 'action', action );
                    additionalData = _this.callback( 'beforeAjax', [
                        formData
                    ]);
                    _this.ajax( formData, additionalData );
                });

            if ( this.options.nested ) {

                $(document)
                    .on('keydown', 'input,textarea', function(event) {
                        if ($(this).parents(_this.element).length) {
                            var code = event.keyCode || event.which;

                            if (code === 13) {
                                event.preventDefault();
                                _this.element.trigger( eventName );
                                return false;
                            }
                        }
                    })
                    .on('click',
                        'button:not([data-ignore-submit]), ' +
                        'input[type="submit"]:not([data-ignore-submit])', function(e) {
                        if ($(this).closest(_this.element).length) {
                            e.preventDefault();
                            _this.element.trigger( eventName );
                            return false;
                        }
                    });
            }
        },
        ajax: function( formData, additionalData ) {
            var _this = this,
            form = _this.element;

            if ( _this.callback('beforeLoad') === false ) {
                return;
            }

            _this.element.trigger('beforeLoad');

            if ( additionalData ) {
                formData = $.extend( true, {}, formData, additionalData );
            }

            if (!_this.options.disabled && _this.options.progressClass ) {
                form.addClass( _this.options.progressClass );
            }

            this.xhr = $.ajax({
                url: _this.element.data( 'action' ) || _this.options.action,
                type: form.data( 'method' ) || form.attr( 'method' ),
                data : formData,
                formData: formData,
                dataType: _this.options.dataType,
                fileInput: _this.element.find(_this.options.fileInput),
                contentType: _this.options.contentType
            })
            .done(function( data, textStatus, jqXHR ) {
                _this.element.trigger( 'done.ajaxForm', [
                    data,
                    textStatus,
                    jqXHR
                ]);

                $(document).trigger( 'formLoaded.ajaxForm' );
            })
            .always(function() {
                _this.option( 'disabled', false );
                if ( _this.options.progressClass ) {
                    form.removeClass( _this.options.progressClass );
                }
            });

            _this.callback( 'afterAjax', [ this.xhr ]);
        },

        // call a user's callback
        callback: function ( callback, args ) {
            var result = true;

            if ( this.options[ callback ] &&
             $.isFunction( this.options[ callback ] ) ) {
                (args = args || []).unshift( this.options );
                result = this.options[ callback ].apply( this.element, args );
            }

            return result === undefined ? true : result;
        },

        // set option(s) or get a single option
        option: function ( options, value ) {
            if (!options ) {
                return;
            }

            if ( value !== undefined ) {
                this.options[ options ] = value;
            } else if ( typeof options === 'string' ) {
                return this.options[ options ];
            } else {
                this.options = $.extend( true, {}, this.options, options );
            }
        },

        destroy: function () {
            $.removeData( this.element, 'ajaxForm.ajaxForm' );
            this.element.off( this.options.method + '.ajaxForm' );
            if ( this.xhr ) {
                this.xhr.abort();
            }
        }
    });

    function plugin( options ) {

        if ( typeof options === 'string' ) {

            // call method
            var args = Array.prototype.slice.call( arguments, 1 );

            this.each(function () {

                var instance = $.data( this, 'ajaxForm.ajaxForm'),
                    returned;

                if (!instance ) {
                    if ( AjaxForm.defaultOptions.requireInit === false ) {
                        $( this ).ajaxForm();
                        instance = $.data( this, 'ajaxForm.ajaxForm' );
                    } else {
                        throw new Error(
                            '[ajaxForm] Cannot call methods on ajaxForm prior to initialization; ' +
                            'attempted to call method \'' + options + '\''
                        );
                    }
                }

                if (!$.isFunction( instance[ options ] ) ||
                 options.charAt( 0 ) === '_' ) {

                    throw new Error(
                        '[ajaxForm] no such method \'' + options + '\' for ajaxForm instance'
                    );
                }

                // apply method
                returned = instance[ options ].apply( instance, args );
                if ( returned !== undefined ) {
                    return returned;
                }

            });
        } else {
            this.each(function () {
                var instance = $.data( this, 'ajaxForm.ajaxForm' );
                if ( instance ) {
                    // apply options & init
                    instance.option( options || {} );
                    instance._init( false );
                } else {
                    // initialize new instance
                    options = $.extend( true, {}, $.data( this ), options );
                    instance = new AjaxForm( options, this );
                    $.data( this, 'ajaxForm.ajaxForm', instance );
                }
            });
        }
        return this;
    }

    $.dsprk = $.dsprk || {};
    $.dsprk.ajaxForm = AjaxForm;
    $.dsprk.ajaxForm.defaultOptions = defaultOptions;
    $.fn.ajaxForm = plugin;

}( window, window.jQuery ));

    $.dsprk.ajaxForm.prototype._init
    
    $('form.simple-form').ajaxForm({
        progressClass: 'loading'
    });
    $('form.complex-form').ajaxForm({
        progressClass: 'progress'
    });
    $('form.simple-form').ajaxForm('_init', 'progressClass'); // loading