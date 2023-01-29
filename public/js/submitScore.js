const submitScore = async function(event) {
    event.preventDefault();
  
    // TODO: figure out how to grab score from phaser
    const score = 100;

    if (score) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/score/submit', {
        method: 'POST',
        body: JSON.stringify({userId: req.session.userId, scoreValue: score }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/scores');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document.querySelector('#submitScore').addEventListener('click', submitScore);
