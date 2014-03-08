(function($){

    $.prototype.fallingText = function(intervalBetweenFalls, fallDuration){
        var $spansForEffect,
            spansIndexes,
            currentIndex = 0,
            counter = 0,
            delay = intervalBetweenFalls;

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

        this.each(function(){
            var startString = $(this).html(),
                resultString='',
                wasUnknownSymbol = false;
            for(var i = 0; i < startString.length; i++){
                if((startString.charCodeAt(i) != 10) && (startString.charCodeAt(i) != 32)){
                    if(wasUnknownSymbol){
                        wasUnknownSymbol = false;
                    }
                    resultString += '<span class="effect-parts">' + startString.charAt(i) + '</span>';
                    console.log(startString.charCodeAt(i) + ':' + startString.charAt(i));
                }
                else{
                    wasUnknownSymbol = true;
                }
            }
            $(this).html(resultString);
        });

        $spansForEffect = $('.effect-parts');

        prepareForEffects($spansForEffect);
        spansIndexes = createIndexes($spansForEffect.length).shuffle();
        setTimeout(function(){
            for(var i = 0; i < $spansForEffect.length; i++){
                $spansForEffect.eq(spansIndexes[i]).css({
                    'transition':'all ' + fallDuration + 'ms linear ' + delay + 'ms',
                    'transform':'translate(0px, 0px)',
                    'opacity':'1'
                });
                delay += intervalBetweenFalls;
            }
        },0);

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

    };

    $('#effector').fallingText(100, 800);

})(jQuery);
