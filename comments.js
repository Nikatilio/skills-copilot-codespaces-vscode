// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Body parser
app.use(bodyParser.json());
app.use(cors());

// Event bus URL
const eventBusUrl = 'http://event-bus-srv:4005/events';

// Store comments
const commentsByPostId = {};

// Handle event
app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;

        // Add comment to post
        const comments = commentsByPostId[postId] || [];
        comments.push({ id, content, status });
        commentsByPostId[postId] = comments;

        // Send event to event bus
        await axios.post(eventBusUrl, {
            type: 'CommentModerated',
            data: {
                id,
                content,
                postId,
                status
            }
        });
    }

    res.send({});
});

// Get comments
app.get('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    const comments = commentsByPostId[postId] || [];

    res.send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
    console.log('Listening on port 4001');
});