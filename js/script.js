// Create politician object and properties
var newPolitician = function(name, partyColor) {

    var politician = {};
    politician.name = name;
    politician.electionResults = null;
    politician.totalVotes = 0;
    politician.partyColor = partyColor;


    politician.tallyTotalVotes = function() {
        this.totalVotes = 0;

        for (var i = 0; i < this.electionResults.length; i++) {
            this.totalVotes = this.totalVotes + this.electionResults[i];
        }
    };

    return politician;

};

var elon = newPolitician("Elon Musk", [178, 21, 67]);
var sam = newPolitician("Sam Altman", [237, 120, 133]);

elon.electionResults = [5, 1, 7, 2, 17, 6, 4, 2, 1, 1, 8, 3, 1, 11, 11, 0, 5, 3, 3, 3, 7, 4, 8, 9, 3, 7, 2, 2, 4, 2, 8, 3, 15, 15, 2, 12, 0, 4, 13, 1, 3, 2, 11, 21, 3, 2, 11, 1, 3, 7, 2];
sam.electionResults = [4, 2, 4, 4, 38, 3, 3, 1, 2, 28, 8, 1, 3, 9, 0, 6, 1, 5, 5, 1, 3, 7, 8, 1, 3, 3, 1, 3, 2, 2, 6, 2, 14, 0, 1, 6, 7, 3, 7, 3, 6, 1, 27, 17, 3, 1, 2, 11, 2, 3, 1];

elon.tallyTotalVotes();
sam.tallyTotalVotes();
//test
//console.log(elon.totalVotes);
//console.log(sam.totalVotes);

//results by state & state winner
var setStateResults = function(state) {

    theStates[state].winner = null;
    if (elon.electionResults[state] > sam.electionResults[state]) {
        theStates[state].winner = elon;
    } else if (sam.electionResults[state] > elon.electionResults[state]) {
        theStates[state].winner = sam;
    }

    // STATE RESULTS TABLE 
    var stateInfoTable = document.getElementById('stateResults');

    // theader TABLE HEADER child[0] --------------------------------
    var header = stateInfoTable.children[0];
    // th STATE NAME [0] [0]-----------------
    var stateName = header.children[0].children[0];
    // th Abbreviation [0] [1] ----------------
    var abbrev = header.children[0].children[1];

    // tbody TABLE BODY child[1] of main TABLE with 3 tr's -----------
    var body = stateInfoTable.children[1];
    // tbody > tr [0] > NAME1 ------------------                .
    var elonName = body.children[0].children[0];
    var elonResults = body.children[0].children[1];

    // tbody > tr [1] > NAME2 ------------------  
    var samName = body.children[1].children[0];
    var samResults = body.children[1].children[1];

    // tbody > tr [2] > WINNER ---------------------
    var winnersName = body.children[2].children[1];

    stateName.innerText = theStates[state].nameFull;
    abbrev.innerText = theStates[state].nameAbbrev;
    elonName.innerText = elon.name;
    elonResults.innerText = elon.electionResults[state];
    samResults.innerText = sam.electionResults[state];
    samName.innerText = sam.name;


    //CHANGE STATE COLOR based on winner    

    var stateWinner = theStates[state].winner;

    if (stateWinner !== null) {
        theStates[state].rgbColor = stateWinner.partyColor;
        winnersName.innerText = stateWinner.name;
    } else {
        theStates[state].rgbColor = [11, 32, 57];
        winnersName.innerText = "It's a TIE!";
    }

};

// function to find country winner
var winner;

if (elon.totalVotes > sam.totalVotes) {
    winner = elon;
} else if (sam.totalVotes > elon.totalVotes) {
    winner = sam;
}
if (winner) {
    console.log("The winner is " + winner.name);
} else {
    console.log("It's a TIE...");
}

var countryInfoTable = document.getElementById('countryResults'); 

var row = countryInfoTable.children[0].children[0]; 
row.children[0].innerText = elon.name + " :";
row.children[1].innerText = elon.totalVotes;
row.children[2].innerText = sam.name + " :";
row.children[3].innerText = sam.totalVotes;
row.children[5].innerText = winner.name.toUpperCase() + "!";
