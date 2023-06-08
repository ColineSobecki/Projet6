document.getElementById('submit').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const url = 'http://localhost:5678/api/users/login';
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      // Traite la réponse de la requête
      if (data.message === 'user not found') {
        console.log('Utilisateur non trouvé');
        // Affiche un message d'erreur à l'utilisateur
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Échec de la connexion. Veuillez vérifier vos identifiants.';
      } else {
        console.log('Connexion réussie');
        // Effectue les actions après une connexion réussie
      }
    })
    .catch(error => {
      console.error('Erreur lors de la requête', error);
    });
  });
  