define(['jquery'], function($){

    $.prototype.fallingText = function(intervalBetweenFalls, fallDuration){

        setArrayShuffleMethod();

        this.each(function(){

            var $spansForEffect;

            prepareElementForEffects($(this));

            $spansForEffect = $(this).find('.effect-parts');

            prepareSpansForEffects($spansForEffect);

            makeSpansEffects($spansForEffect);

        });


        return this;

        function prepareSpansForEffects($text){
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
                effectsSpantModel = $('<span>'),
                incomingString = (element.text()).trim();
            element.empty();
            effectsSpantModel.addClass('effect-parts');
            for(var i = 0; i < incomingString.length; i++){
                var currentSpan = effectsSpantModel.clone();
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

        function makeSpansEffects($elements){
            var currentIndex = 0,
                spansIndexes;
            spansIndexes = createIndexes($elements.length).shuffle();

            (function makeEffects(){

                setTimeout(function (){
                    $elements.eq(spansIndexes[currentIndex]).css({
                        'transition':'all ' + fallDuration + 'ms linear 0ms',
                        'transform':'translate(0px, 0px)',
                        'opacity':'1'
                    });
                    currentIndex++;

                    if(currentIndex == $elements.length){return;}

                    makeEffects();

                },intervalBetweenFalls);

            })();

        }
        function setArrayShuffleMethod(){
            Array.prototype.shuffle = function(){
                var randomIndex,
                    exchangeVar,
                    elements = this,
                    countOfElements = elements.length;
                for(var i = 0; i < countOfElements; i++){
                    randomIndex = getRandomInt(0, countOfElements - 1);
                    exchangeVar = elements[randomIndex];
                    elements[randomIndex] = elements[i];
                    elements[i] = exchangeVar;
                }
                return elements;
            };
        }

    };

});



