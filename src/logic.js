var deck_id
var tableau = [[],[],[],[],[],[],[]]

axios.get('http://deckofcardsapi.com/api/deck/new/')
  .then(function (response) {
    deck_id = response.data.deck_id;

    ReactDOM.render(
      <h1>Deck id is {deck_id}</h1>,
      document.getElementById('example')
    );

    console.log(deck_id);
    for(var i = 0;i < 7; i++){
      deal(i+1,tableau[i]);
    }
    setTimeout(function () {
      console.log(tableau);
    }, 1000);
  })
  .catch(function (response) {
    console.log('Error when submitting new deck request.');
    ReactDOM.render(
      <h1>Error contacting cards API</h1>,
      document.getElementById('example')
    );
  });

function deal(count,pile){
  axios.get('http://deckofcardsapi.com/api/deck/'+deck_id+'/draw/?count='+count)
   .then(function(response){
     pile[0] = response;
   })
   .catch(function(response){
     console.log('Error when submitting drawing a new card.');
   })
}
