

    // jQuery UI Dialog initialization
    $( "#dialog-confirm" ).dialog({
      resizable: false,
      height: 140,
      modal: true,
      buttons: {
        "Delete all items": function() {
          $( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      }
    });



    // ===================================

    // $.fn.dialog has a method `open`

    $( ".selector" ).dialog( "open" );