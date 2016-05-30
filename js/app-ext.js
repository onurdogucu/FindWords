$(document).on('click', '.cell', function(e) {
    $(this).trigger('game.selectLetter');
});
$(document).on('click', '.guessButton', function(e) {
    $("#game").trigger('game.guessTheWord');
});



$('#start_on_exhausted').click(function() {
    $('#timer_on_exhausted').backward_timer('start');
    $("#game").trigger('game.startGame');
})
$('#cancel_on_exhausted').click(function() {
    $('#timer_on_exhausted').backward_timer('cancel')
})
$('#reset_on_exhausted').click(function() {
    $('#timer_on_exhausted').backward_timer('reset');
    $('#timer_on_exhausted').backward_timer('cancel')
    $("#game").trigger('game.resetGame');

})

$('.tooltip').tooltipster();



