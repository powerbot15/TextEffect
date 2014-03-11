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
            console.time("Start");
            resultString = prepareString(startString);
            console.timeEnd("End");
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
                if(incomingString.charCodeAt(i) == 32){
                    resultString += '<span class="effect-parts">&nbsp;</span>';
                }
                resultString += '<span class="effect-parts">' + incomingString.charAt(i) + '</span>';
            }
            return resultString;
        }
        function makeEffects($elements){
            var currentIndex = 0;
            spansIndexes = createIndexes($elements.length).shuffle();

            (function make(){

                setTimeout(function (){
                    $elements.eq(spansIndexes[currentIndex]).css({
                        'transition':'all ' + fallDuration + 'ms ease-out 0ms',
                        'transform':'translate(0px, 0px)',
                        'opacity':'1'
                    });
                    currentIndex++;
                    if(currentIndex == $elements.length){return;}
                    make();

                },intervalBetweenFalls);


            })();

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

    $('.effector').fallingText(50, 500);

})(jQuery);
