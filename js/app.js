(function ($, window, document) {

    "use strict";

    var selectedPath = new Array();
    var wordPath = new Array();
    var trueWordId = "";
    var secondsLeft = 0;
    var correctWordCount = 0;
    var score = 0;

    var createGames  = {
        init: function (options, el)
        {

            var base = this;
            base.el = el;
            base.$elem = $(el);
            base.options = $.extend({}, $.fn.createGame.options, base.$elem.data(), options);

            base.perPoint = base.options.totalScore / base.options.countdown;
            base.loadGame();
            console.log(base.options);
        },
        loadGame: function()
        {
            var base = this;

            base.customEvents();
            base.drawMatrix();
            base.setTimer();

        },

        drawMatrix: function()
        {
            var base = this;
            var dimension = base.options.gameMatrix;
            var total_x = dimension.split('x')[0];
            var total_y = dimension.split('x')[1];
            base.$elem.css('width', (parseInt(total_x) * 40 + parseInt(total_x))  + "px");
            base.$elem.css('height', (parseInt(total_y) * 40 + parseInt(total_y)) + "px");
            for(var i = 0;i < total_x; i++)
            {
                for(var y = 0; y <total_y; y++)
                {
                    var randomChar = base.getRandomChar(1,"ABCDEFGHIJKLMNOPQRSTUVWXYZ");
                    base.$elem.append(sprintf(base.templates().per_cell, y +"-"+ i, randomChar));
                }
            }

            base.putWords();
        },

        putWords:function()
        {
            var base = this;

            var all_words = base.options.words;

            $.each(all_words,function(i,val){

                var word = val["definition"];
                var chars = word.split('');
                var start_x = parseInt(val["start_point"].split('-')[0]);
                var start_y = parseInt(val["start_point"].split('-')[1]);
                var end_x = parseInt(val["end_point"].split('-')[0]);
                var end_y = parseInt(val["end_point"].split('-')[1]);
                var counter = 0;


                if((start_x == end_x) && (start_y < end_y))
                {
                    for(var y = start_y; y <= end_y; y++)
                    {
                        $('.cell[data-position="'+ start_x +"-"+ y +'"]').html(chars[counter].toUpperCase());
                        //$('.cell[data-position="'+ start_x +"-"+ y +'"]').css('background-color',val["color"]);
                        //$('.cell[data-position="'+ start_x +"-"+ y +'"]').css('color','white');
                        counter++;
                    }
                }
                else if((start_x == end_x) && (start_y > end_y))
                {
                    for(var y = end_y; y > start_y; y--)
                    {
                        $('.cell[data-position="'+ start_x +"-"+ y +'"]').html(chars[counter].toUpperCase());
                        //$('.cell[data-position="'+ start_x +"-"+ y +'"]').css('background-color',val["color"]);
                        //$('.cell[data-position="'+ start_x +"-"+ y +'"]').css('color','white');

                        counter++;
                    }
                }
                else if((start_x < end_x) && (start_y < end_y))
                {
                    for(var y = 0; y < chars.length; y++)
                    {

                        $('.cell[data-position="'+ parseInt(start_x) +"-"+ parseInt(start_y) +'"]').html(chars[counter].toUpperCase());
                        //$('.cell[data-position="'+ parseInt(start_x) +"-"+ parseInt(start_y) +'"]').css('background-color',val["color"]);
                        //$('.cell[data-position="'+ parseInt(start_x) +"-"+ parseInt(start_y) +'"]').css('color','white');
                        start_x++;
                        start_y++;
                        counter++;
                    }
                }
                else if((start_x < end_x) && (start_y == end_y))
                {
                    for(var y = start_x; y <= end_x; y++)
                    {
                        $('.cell[data-position="'+ y +"-"+ start_y +'"]').html(chars[counter].toUpperCase());
                        //$('.cell[data-position="'+ y +"-"+ start_y +'"]').css('background-color',val["color"]);
                        //$('.cell[data-position="'+ y +"-"+ start_y +'"]').css('color','white');
                        counter++;
                    }
                }
                else if((start_x > end_x) && (start_y == end_y))
                {
                    for(var y = start_x; y >= end_x; y--)
                    {
                        $('.cell[data-position="'+ y +"-"+ start_y +'"]').html(chars[counter].toUpperCase());
                        // $('.cell[data-position="'+ y +"-"+ start_y +'"]').css('background-color',val["color"]);
                        //$('.cell[data-position="'+ y +"-"+ start_y +'"]').css('color','white');

                        counter++;
                    }
                }
                else if((start_x < end_x) && (start_y > end_y))
                {
                    for(var y = 0; y < chars.length; y++)
                    {

                        $('.cell[data-position="'+ parseInt(start_x) +"-"+ parseInt(start_y) +'"]').html(chars[counter].toUpperCase());
                        //$('.cell[data-position="'+ parseInt(start_x) +"-"+ parseInt(start_y) +'"]').css('background-color',val["color"]);
                        //$('.cell[data-position="'+ parseInt(start_x) +"-"+ parseInt(start_y) +'"]').css('color','white');
                        start_x++;
                        start_y--;

                        counter++;
                    }
                }
                else if((start_x > end_x) && (start_y < end_y))
                {
                    for(var y = 0; y < chars.length; y++)
                    {

                        $('.cell[data-position="'+ parseInt(start_x) +"-"+ parseInt(start_y) +'"]').html(chars[counter].toUpperCase());
                        //$('.cell[data-position="'+ parseInt(start_x) +"-"+ parseInt(start_y) +'"]').css('background-color',val["color"]);
                        //$('.cell[data-position="'+ parseInt(start_x) +"-"+ parseInt(start_y) +'"]').css('color','white');
                        start_x--;
                        start_y++;

                        counter++;
                    }
                }
                else if((start_x > end_x) && (start_y > end_y))
                {
                    for(var y = 0; y < chars.length; y++)
                    {

                        $('.cell[data-position="'+ parseInt(start_x) +"-"+ parseInt(start_y) +'"]').html(chars[counter].toUpperCase());
                        //$('.cell[data-position="'+ parseInt(start_x) +"-"+ parseInt(start_y) +'"]').css('background-color',val["color"]);
                        //$('.cell[data-position="'+ parseInt(start_x) +"-"+ parseInt(start_y) +'"]').css('color','white');
                        start_x--;
                        start_y--;
                        counter++;
                    }
                }



            });
        },

        getRandomChar : function(length, char)
        {
            return randomString(length, char);

        },

        letterSelect:function(el)
        {

            var  base = this;
            el.toggleClass('active');
            var coordinate = el.attr('data-position');
            var x = parseInt(coordinate.split('-')[0]);
            var y = parseInt(coordinate.split('-')[1]);
            var path = x+"-"+y;
            if($.inArray(path, selectedPath) !== -1)
            {
                selectedPath.remove(path);
                return;
            }
            else
            {

                selectedPath.push(path);
            }


        },

        guessTheWord : function()
        {
            var base = this;

            var final = false;

            var all_words = base.options.words;

            $.each(all_words,function(i,val){

                var word = val["definition"];
                var id = i;
                var chars = word.split('');
                var start_x = parseInt(val["start_point"].split('-')[0]);
                var start_y = parseInt(val["start_point"].split('-')[1]);
                var end_x = parseInt(val["end_point"].split('-')[0]);
                var end_y = parseInt(val["end_point"].split('-')[1]);


                if((start_x == end_x) && (start_y < end_y))
                {
                    for(var y = start_y; y <= end_y; y++)
                    {
                        wordPath.push(start_x +"-"+ y);
                    }
                }
                else if((start_x == end_x) && (start_y > end_y))
                {
                    for(var y = end_y; y > start_y; y--)
                    {
                        wordPath.push(start_x +"-"+ y);
                    }
                }
                else if((start_x < end_x) && (start_y < end_y))
                {
                    for(var y = 0; y < chars.length; y++)
                    {

                        wordPath.push(parseInt(start_x) +"-"+ parseInt(start_y));
                        start_x++;
                        start_y++;
                    }
                }
                else if((start_x < end_x) && (start_y == end_y))
                {
                    for(var y = start_x; y <= end_x; y++)
                    {
                        wordPath.push(y +"-"+ start_y);
                    }
                }
                else if((start_x > end_x) && (start_y == end_y))
                {
                    for(var y = start_x; y >= end_x; y--)
                    {
                        wordPath.push(y +"-"+ start_y);
                    }
                }
                else if((start_x < end_x) && (start_y > end_y))
                {
                    for(var y = 0; y < chars.length; y++)
                    {

                        wordPath.push(parseInt(start_x) +"-"+ parseInt(start_y));
                        start_x++;
                        start_y--;
                    }
                }
                else if((start_x > end_x) && (start_y < end_y))
                {
                    for(var y = 0; y < chars.length; y++)
                    {

                        wordPath.push(parseInt(start_x) +"-"+ parseInt(start_y));
                        start_x--;
                        start_y++;
                    }
                }
                else if((start_x > end_x) && (start_y > end_y))
                {
                    for(var y = 0; y < chars.length; y++)
                    {

                        wordPath.push(parseInt(start_x) +"-"+ parseInt(start_y));
                        start_x--;
                        start_y--;
                    }
                }

                var status = base.checkGuess(id);
                if(status == false) {
                    wordPath = new Array();

                }
                else
                {
                    base.colorizeWord();
                    wordPath = new Array();
                    selectedPath = new Array();
                    final = true;
                    return true;
                }

            });
            if(!final) {
                score -= base.options.wrongAnswerMinus;
                base.updateScore();
                alert("Your guess is wrong! Try again..")
            }
            selectedPath = new Array();
            base.removeActiveCells();
        },

        removeActiveCells : function()
        {
            var base = this;
            base.$elem.find('.cell').removeClass('active');
        },

        removeStyle : function()
        {
            var base = this;

            $('.cell').removeAttr('style');
        },

        colorizeWord : function()
        {
            var base = this;

            var val = base.options.words[trueWordId];
            var chars = val["definition"].split('');
            var start_x = parseInt(val["start_point"].split('-')[0]);
            var start_y = parseInt(val["start_point"].split('-')[1]);
            var end_x = parseInt(val["end_point"].split('-')[0]);
            var end_y = parseInt(val["end_point"].split('-')[1]);


            if((start_x == end_x) && (start_y < end_y))
            {
                for(var y = start_y; y <= end_y; y++)
                {
                    $('.cell[data-position="'+ start_x +"-"+ y +'"]').css('background-color',val["color"]);
                    $('.cell[data-position="'+ start_x +"-"+ y +'"]').css('color','white');
                }
            }
            else if((start_x == end_x) && (start_y > end_y))
            {
                for(var y = end_y; y > start_y; y--)
                {
                    $('.cell[data-position="'+ start_x +"-"+ y +'"]').css('background-color',val["color"]);
                    $('.cell[data-position="'+ start_x +"-"+ y +'"]').css('color','white');
                }
            }
            else if((start_x < end_x) && (start_y < end_y))
            {
                for(var y = 0; y < chars.length; y++)
                {

                    $('.cell[data-position="'+ parseInt(start_x) +"-"+ parseInt(start_y) +'"]').css('background-color',val["color"]);
                    $('.cell[data-position="'+ parseInt(start_x) +"-"+ parseInt(start_y) +'"]').css('color','white');
                    start_x++;
                    start_y++;
                }
            }
            else if((start_x < end_x) && (start_y == end_y))
            {
                for(var y = start_x; y <= end_x; y++)
                {
                    $('.cell[data-position="'+ y +"-"+ start_y +'"]').css('background-color',val["color"]);
                    $('.cell[data-position="'+ y +"-"+ start_y +'"]').css('color','white');
                }
            }
            else if((start_x > end_x) && (start_y == end_y))
            {
                for(var y = start_x; y >= end_x; y--)
                {
                     $('.cell[data-position="'+ y +"-"+ start_y +'"]').css('background-color',val["color"]);
                    $('.cell[data-position="'+ y +"-"+ start_y +'"]').css('color','white');
                }
            }
            else if((start_x < end_x) && (start_y > end_y))
            {
                for(var y = 0; y < chars.length; y++)
                {

                    $('.cell[data-position="'+ parseInt(start_x) +"-"+ parseInt(start_y) +'"]').css('background-color',val["color"]);
                    $('.cell[data-position="'+ parseInt(start_x) +"-"+ parseInt(start_y) +'"]').css('color','white');
                    start_x++;
                    start_y--;
                }
            }
            else if((start_x > end_x) && (start_y < end_y))
            {
                for(var y = 0; y < chars.length; y++)
                {

                    $('.cell[data-position="'+ parseInt(start_x) +"-"+ parseInt(start_y) +'"]').css('background-color',val["color"]);
                    $('.cell[data-position="'+ parseInt(start_x) +"-"+ parseInt(start_y) +'"]').css('color','white');
                    start_x--;
                    start_y++;
                }
            }
            else if((start_x > end_x) && (start_y > end_y))
            {
                for(var y = 0; y < chars.length; y++)
                {

                    $('.cell[data-position="'+ parseInt(start_x) +"-"+ parseInt(start_y) +'"]').css('background-color',val["color"]);
                    $('.cell[data-position="'+ parseInt(start_x) +"-"+ parseInt(start_y) +'"]').css('color','white');
                    start_x--;
                    start_y--;
                }
            }

        },

        checkGuess : function(id)
        {
            var base = this;
            if(selectedPath.sort().join(',')=== wordPath.sort().join(',')){
                trueWordId = id;
                correctWordCount++;
                var words = sprintf(base.templates().cell_description,base.options.words[trueWordId].description,base.options.words[trueWordId].definition);
                base.addGuessedWord(words);
                base.addScore();
                console.log(correctWordCount);

                if(correctWordCount == Object.keys(base.options.words).length)
                {
                    base.finishGameBeforeTime();
                }
                return true;
            }
            else return false;
        },

        addScore : function()
        {
            var base = this;
            var val = base.options.words[trueWordId];
            var chars = val["definition"].split('');
            var length = chars.length;

            score += length * base.options.perLetterPoint;
            console.log(score);
            base.updateScore();
        },

        updateScore : function()
        {
            var base = this;

           $('#score').html(score);
        },

        templates: function ()
        {

            var templateContent = {

                // Modal Elements

                "per_cell": "<div class='cell disabled' data-position='%s'>%s</div>",
                "cell_description": "<span class='tooltip' title='%s'>%s</a>"
            }

            return templateContent;

        },

        startGame : function()
        {
            var base = this;
            $('button').removeAttr('disabled');
            $('.cell').removeClass('disabled');
            $('.cell').removeClass('finished');
        },

        resetGame : function()
        {
            var base = this;

            selectedPath = new Array();
            wordPath = new Array();
            $('button.boo').removeAttr('disabled');
            $('button.foo').attr('disabled','disabled');
            $('button.doo').attr('disabled','disabled');
            $('.cell').addClass('disabled');
            $("#message").empty();
            score = 0;
            correctWordCount = 0;
            base.resetGuessedWords();
            base.removeActiveCells();
            base.removeStyle();
            base.resetScore();
        },

        resetGuessedWords : function()
        {
            var base = this;

            $('#guessed').html('');
        },

        resetScore : function()
        {
            var base = this;

            $('#score').html('0');
        },

        setTimer : function()
        {
            var base = this;

            $('#timer_on_exhausted').backward_timer({
                seconds : base.options.countdown,
                on_exhausted: function(timer) {
                    timer.target.text('Time is expired!');
                    base.finishGame();
                },
                on_tick: function(timer) {
                    secondsLeft = timer.seconds_left;
                }
            })
        },

        addGuessedWord : function(word)
        {
            $('#guessed').append(word);
            $('.tooltip').tooltipster();
            var base = this;
        },

        finishGame : function()
        {
            var base = this;

            score += secondsLeft * base.perPoint;
            base.updateScore();
            $('button.doo').attr('disabled','disabled');
            $('button.boo').attr('disabled','disabled');
            $('.cell').addClass('finished');
            $('#timer_on_exhausted').backward_timer('cancel');
        },

        finishGameBeforeTime : function()
        {
            var base = this;

            score += secondsLeft * base.perPoint;
            base.updateScore();
            $('button.doo').attr('disabled','disabled');
            $('button.boo').attr('disabled','disabled');
            $('.cell').addClass('finished');
            $('#timer_on_exhausted').backward_timer('cancel');
            $('#message').html('Congratulations!. You found all of the words.');
        },

        customEvents: function ()
        {
            var base = this;
            base.$elem.on("game.selectLetter", function (e) {
                var self = $(e.target);
                base.letterSelect(self);
            });

            base.$elem.on("game.guessTheWord", function (e) {
                var self = $(e.target);
                base.guessTheWord();
            });

            base.$elem.on("game.resetGame", function (e) {
                var self = $(e.target);
                base.resetGame();
            });

            base.$elem.on("game.startGame", function (e) {
                var self = $(e.target);
                base.startGame();
            });

        },
    };

    $.fn.createGame = function (data) {
        return this.each(function () {
            var create_game = Object.create(createGames);
            create_game.init(data, this);
            $.data(this, "createGame", create_game);
        });
    };

    $.fn.createGame.options = {

        gameMatrix : "14x14",
        words : {
            0 : {
                 color : "#B40404",
                 definition : "Proteomics",
                 start_point : "9-6", // x coordinate of game - y coordinate of game --- Starts from 0...
                 end_point : "0-6", // x coordinate of game - y coordinate of game --- Starts from 0...
                 description : "is a rapidly growing field of molecular biology that is concerned with the systematic, high-throughput approach to protein expression analysis a cell or an organisms"
            },
            1 : {
                 color : "#0B0B61",
                 definition : "Genomics",
                 start_point : "7-3", // x coordinate of game - y coordinate of game --- Starts from 0...
                 end_point : "7-10", // x coordinate of game - y coordinate of game --- Starts from 0...
                 description : "is an area within genetics that concerns the sequencing and analysis of an organism's genome"
            },
            2 : {
                color : "#0B3B0B",
                definition : "Metabolomics",
                start_point : "2-1", // x coordinate of game - y coordinate of game --- Starts from 0...
                end_point : "13-12", // x coordinate of game - y coordinate of game --- Starts from 0...
                description : "is the large-scale study of small molecules commonly known as metabolites within cells, biofluids, tissues or organisms"
            },
            3 : {
                color : "#B45F04",
                definition : "Cytomics",
                start_point : "12-2", // x coordinate of game - y coordinate of game --- Starts from 0...
                end_point : "12-9", // x coordinate of game - y coordinate of game --- Starts from 0...
                description : "is study of cell systems at a single cell level"
            },
            4 : {
                color : "#190707",
                definition : "Metagenomics",
                start_point : "2-2", // x coordinate of game - y coordinate of game --- Starts from 0...
                end_point : "13-2", // x coordinate of game - y coordinate of game --- Starts from 0...
                description : "is the study of genetic material recovered directly from environmental samples"
            }
        },
        countdown : 120, // second based
        totalScore : 6000,
        wrongAnswerMinus : 100,
        perLetterPoint : 50

    };

    Array.prototype.remove = function() {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };


    function sprintf(format) {
        for (var i = 1; i < arguments.length; i++) {
            format = format.replace(/%s/, arguments[i]);
        }
        return format;
    }

    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }


    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });

}(jQuery, window, document));
