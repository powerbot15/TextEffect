(function($){

    $.prototype.fallingText = function(intervalBetweenFalls, fallDuration){
        var $spansForEffect,
            spansIndexes,
            currentIndex = 0,
            counter = 0;


        setArrayShuffleMethod();

        this.each(function(){
            var startString = $(this).text(),
                resultString='',
                wasUnknownSymbol = false;
            resultString = prepareString(startString);
            $(this).html(resultString);
        });

        $spansForEffect = $('.effect-parts');

        prepareForEffects($spansForEffect);
        makeEffects($spansForEffect);

        return this;

        function prepareForEffects($text){
            $text.css({
                'display':'inline-block',
                'transform':'translate(0px, -100px)',
                'opacity':'0'
            });
        }
        function getRandomInt(min, max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        function createIndexes(count){
            var resultArray = [], i;
            for(i = 0; i < count; i++){
                resultArray.push(i);
            }
            return resultArray;
        }
        function prepareString(text){
            var resultString = '',
                incomingString = text.trim();
            for(var i = 0; i < incomingString.length; i++){
                if(incomingString.charCodeAt(i) == 10){
                    i++;
                    while((incomingString.charCodeAt(i) == 32)||(incomingString.charCodeAt(i) == 10)){i++};
                }
                if(incomingString.charCodeAt(i) == 32){
                    resultString += '<span class="effect-parts">&nbsp;</span>';
                }
                resultString += '<span class="effect-parts">' + incomingString.charAt(i) + '</span>';
            }
            return resultString;
        }
        function makeEffects($elements){
            var delay = intervalBetweenFalls;
            spansIndexes = createIndexes($elements.length).shuffle();
            setTimeout(function(){
                for(var i = 0; i < $elements.length; i++){
                    $elements.eq(spansIndexes[i]).css({
                        'transition':'all ' + fallDuration + 'ms linear ' + delay + 'ms',
                        'transform':'translate(0px, 0px)',
                        'opacity':'1'
                    });
                    delay += intervalBetweenFalls;
                }
            },0);

        }
        function setArrayShuffleMethod(){
            Array.prototype.shuffle = function(){
                var
                    randomIndex,
                    exchangeVar,
                    countOfElements = this.length;
                for(var i = 0; i < countOfElements; i++){
                    randomIndex = getRandomInt(0, countOfElements - 1);
                    exchangeVar = this[randomIndex];
                    this[randomIndex] = this[i];
                    this[i] = exchangeVar;
                }
                return this;
            };
        }

    };

    $('.effector').fallingText(50, 550);

})(jQuery);
