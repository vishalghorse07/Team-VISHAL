const express = require('express');
const AWS = require('aws-sdk');
const app = express();

AWS.config.update({ region: 'us-east-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

app.get('/user/:userId', (req, res) => {
    const params = {
        TableName: 'UserProfiles',
        Key: { userId: req.params.userId, genre: 'default' }
    };
    dynamodb.get(params, (err, data) => {
        if (err) res.status(500).send(err);
        else res.json(data.Item);
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
