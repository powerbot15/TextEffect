define(['jquery'], function($){

    $.prototype.fallingText = function(intervalBetweenFalls, fallDuration){

        setArrayShuffleMethod();

        this.each(function(){
            var $spansForEffect;

            prepareElementForEffects($(this));
            $spansForEffect = $(this).find('.effect-parts');
            prepareForEffects($spansForEffect);
            makeEffects($spansForEffect);

        });


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
        function prepareElementForEffects(element){
            var
                effectsElement = $('<span>'),
                incomingString = (element.text()).trim();
            element.empty();
            effectsElement.addClass('effect-parts');
            console.log(effectsElement);
            for(var i = 0; i < incomingString.length; i++){
                var currentSpan = effectsElement.clone();
                console.log(currentSpan);
                if(incomingString.charCodeAt(i) == 32){
                    currentSpan.html('&nbsp;');
                }
                else{
                    currentSpan.text(incomingString.charAt(i));
                }
                element.append(currentSpan);
            }
            return element;
        }
        function makeEffects($elements){
            var currentIndex = 0,
                spansIndexes;
            spansIndexes = createIndexes($elements.length).shuffle();

            (function make(){

                setTimeout(function (){
                    $elements.eq(spansIndexes[currentIndex]).css({
                        'transition':'all ' + fallDuration + 'ms linear 0ms',
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

});



