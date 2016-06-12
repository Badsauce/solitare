var deck_id

axios.get('http://deckofcardsapi.com/api/deck/new/')
  .then(function (response) {
    deck_id = response.data.deck_id;

    ReactDOM.render(
      <h1>Deck id is {deck_id}</h1>,
      document.getElementById('example')
    );
  })
  .catch(function (response) {
    console.log('Error when submitting new deck request.');
  });

console.log(deck_id);
