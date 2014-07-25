
    function applyText (text) {
        this.text(text);
    }

    function TextManager () {

    }

    TextManager.prototype.applyText = function (text) {
        this
    };

    var textManager = new TextManager();

    textManager.applyText(text);

    textManager.applyText.call(element, text);

    applyText(element, text);

    applyText.call(element, text);
    applyText.apply(element, [ text ]);

