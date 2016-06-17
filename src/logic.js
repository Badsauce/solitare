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

var Board = React.createClass({
  render: function() {
    var style = {
      position: 'absolute',
      background: 'url(/src/images/wov.png)',
      width: '100%',
      height: '100vh',
      top: 0,
      left: 0
    };

    return (
      <div style={style}>
      </div>
    );
  }
});

var Card = React.createClass({
  render: function() {
    var style = {
      position: this.props.position,
      width: '100%',
      top: 3*this.props.offsetMultiplier +'em'
    };

    var image = 'src/images/cardBack.png';
    if(this.props.flipped){
      image = this.props.card.image;
    }

    return (
      <img style={style} className="card" src={image}/>
    );
  }
});

var Stock = React.createClass({
  render: function() {
    var style = {
      position: 'relative',
      width: '8em',
      margin: '0 .5em'
    };

    return (
      <div style={style}>
        <Card card={stock[0]} flipped={false} position={'relative'} offsetMultiplier={0}/>
      </div>
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
        <Card card={this.props.contents[ii]} flipped={ii == this.props.contents.length-1} position={'absolute'} offsetMultiplier={ii} key={ii}/>
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
      <Board/>
      <Stock/>
      <Tableau/>
    </div>,
    document.getElementById('example')
  );
}

initalize()
