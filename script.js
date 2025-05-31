AWS.config.update({
    region: 'us-east-1',
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'YOUR_COGNITO_IDENTITY_POOL_ID'
    })
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const personalize = new AWS.PersonalizeRuntime();

function login() {
    const userId = document.getElementById('userSelect').value;
    document.getElementById('login').style.display = 'none';
    document.getElementById('recommendations').style.display = 'block';
    getRecommendations(userId);
}

function getRecommendations(userId) {
    const params = {
        campaignArn: 'YOUR_PERSONALIZE_CAMPAIGN_ARN',
        userId: userId,
        numResults: 10 // Request more results to allow randomization
    };
    personalize.getRecommendations(params, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        // Randomly select 4 movies from the recommendations
        const recommendations = data.itemRecommendations;
        const shuffled = recommendations.sort(() => 0.5 - Math.random());
        const selectedMovies = shuffled.slice(0, 4);
        
        const movieList = document.getElementById('movieList');
        movieList.innerHTML = '';
        selectedMovies.forEach(item => {
            const div = document.createElement('div');
            div.className = 'movie';
            div.textContent = `Movie: ${item.itemId}`;
            movieList.appendChild(div);
        });
    });
}
