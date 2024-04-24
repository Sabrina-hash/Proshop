import express from 'express';
import { OAuth2Client } from 'google-auth-library';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Redirect user to Google for authentication of account
router.get('/google', async (req, res) => {
  const url = client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
  res.redirect(url);
});

// Google callback URL
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;
  const { tokens } = await client.getToken(code);
  client.setCredentials(tokens);

  // Use the token to get user information 
  const oauth2 = google.oauth2({
    auth: client,
    version: 'v2'
  });

  oauth2.userinfo.get((err, response) => {
    if (err) {
      res.status(500).send('Failed to fetch user info');
    } else {
        // this is the user information
      console.log(response.data);
      res.send(`Hello, ${response.data.name}`);
    }
  });
});

export default router;
