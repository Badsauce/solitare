var stock;
var tableau = [[],[],[],[],[],[],[]];

//Get a shuffled deck from deckofcardsapi and call renderSolitare
function initalize(){
  axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=52')
   .then(function(response){
     stock = response.data.cards;
     console.log(stock);
     dealStartingCards();
     renderSolitare();
   })
  //  .catch(function(response){
  //    console.log('Error when drawing the stock from card API.');
  //    ReactDOM.render(
  //      <h1>Error contacting cards API</h1>,
  //      document.getElementById('example')
  //    );
  //  });
}

function dealStartingCards(){
  for(var startingTableau = 0; startingTableau < 7; startingTableau++){
    for(var dealIndex = startingTableau; dealIndex <7; dealIndex++ ){
      tableau[dealIndex].push(stock.pop());
    }
  }
}

var Card = React.createClass({
  render: function() {
    return (
      <img src={this.props.card.image}/>
    );
  }
});

var Stock = React.createClass({
  render: function() {
    var cards = [];
    for(var ii = 0;ii < stock.length;ii++){
      cards.push(
        <Card card={stock[ii]} key={ii}/>
      );
    }

    return (
      <div>{stock.length}</div>
    );
  }
});

var Tableau = React.createClass({
  render: function() {
    var tableauPiles = [];
    for(var ii = 0;ii < tableau.length;ii++){
      tableauPiles.push(
        <TableauPile contents={tableau[ii]} key={ii}/>
      );
    }

    return (
      <div className="tableau">{tableauPiles}</div>
    );
  }
});

var TableauPile = React.createClass({
  render: function() {
    var cards = [];
    for(var ii =0; ii < this.props.contents.length; ii++){
      cards.push(
        <Card card={this.props.contents[ii]} key={ii}/>
      );
    }
    return (
      <div>{cards}</div>
    );
  }
});

function renderSolitare(){
  ReactDOM.render(
    <div>
      <Tableau/>
      <Stock/>
    </div>,
    document.getElementById('example')
  );
}

initalize()
