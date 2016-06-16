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
    var style = {
      position: 'absolute',
      width: '100%',
      top: 3*this.props.offsetMultiplier +'em'
    };

    return (
      <img style={style} className="card" src={this.props.card.image}/>
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
    var style = {
      display: 'flex'
    };

    var tableauPiles = [];
    for(var ii = 0;ii < tableau.length;ii++){
      tableauPiles.push(
        <TableauPile contents={tableau[ii]} key={ii}/>
      );
    }

    return (
      <div style={style} className="tableau">{tableauPiles}</div>
    );
  }
});

var TableauPile = React.createClass({
  render: function() {
    var style = {
      position: 'relative',
      width: '8em',
      margin: '0 .5em'
    };

    var cards = [];
    for(var ii =0; ii < this.props.contents.length; ii++){
      cards.push(
        <Card card={this.props.contents[ii]} offsetMultiplier={ii} key={ii}/>
      );
    }
    return (
      <div style={style} className="tableau-pile">{cards}</div>
    );
  }
});

function renderSolitare(){
  ReactDOM.render(
    <div>
      <Stock/>
      <Tableau/>
    </div>,
    document.getElementById('example')
  );
}

initalize()
