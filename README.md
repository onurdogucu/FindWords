# FindWords
Finding Words Game Built with Javascript &amp; jQuery


Demo is available at / Demo bağlantısı : [Demo](http://themethunders.com/game/FindWords/ "Demo URL" target="_blank")


##Usage

You should add `<div id="game"></div>` inside `<body>` tag. You can launch the game by adding lines below :

`$('#game').createGame();`

If you want to change Matrix Size or Words direction and location you should createGame with some attributes like below :

`$('#game').createGame({`
  `gameMatrix : "14x14",`
  `words : {`
            `0 : {`
                 `color : "#B40404", // Correct words background color after selected`
                 `definition : "Proteomics", // Word definition placed in matrix`
                 `start_point : "9-6", // x coordinate of game - y coordinate of game --- Starts from 0...`
                 `end_point : "0-6", // x coordinate of game - y coordinate of game --- Starts from 0...`
                 `description : "Description of the Word"`
            `},`
            `1 : {`
                 `color : "#0B0B61",`
                 `definition : "Genomics",`
                 `start_point : "7-3", // x coordinate of game - y coordinate of game --- Starts from 0...`
                 `end_point : "7-10", // x coordinate of game - y coordinate of game --- Starts from 0...`
                 `description : "is an area within genetics that concerns the sequencing and analysis of an organism's genome"`
            `}`
        `},`
        `countdown : 120, // Second based`
        `wrongAnswerMinus : 100, // Point of each wrong guess`
        `perLetterPoint : 50 // Pet letter point. If user find "Hello" word, user will get 250 points.`
`})`
