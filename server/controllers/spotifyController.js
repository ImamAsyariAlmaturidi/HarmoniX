const axios = require("axios");
const querystring = require("querystring");
const SpotifyWebApi = require("spotify-web-api-node");
const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  SCOPE,
  TOKEN_BASE_URL,
  STATE_KEY,
} = require("../config/api.config");
const { generateRandomString } = require("../helpers/randomString");

const spotifyApi = new SpotifyWebApi({
  clientId: "0cdf0fe63eaa4e9ba6294a79f2019325",
  clientSecret: "61b10f82d62249fa9868a3334acdfe0b",
  redirectUri: "http://localhost:3000/callback",
});

class Controller {
  static async auth(req, res) {
    const state = generateRandomString(16);
    res.cookie(STATE_KEY, state);
    try {
      res.redirect(
        "https:/accounts.spotify.com/authorize?" +
          querystring.stringify({
            response_type: "code",
            client_id: "0cdf0fe63eaa4e9ba6294a79f2019325",
            scope: SCOPE,
            redirect_uri: "http://localhost:3000/callback",
            state,
          })
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async cb(req, res) {
    const error = req.query.error;
    const code = req.query.code;

    if (error) {
      console.error("Callback Error:", error);
      res.status(400).send(`Callback Error: ${error}`);
      return;
    }

    try {
      const data = await spotifyApi.authorizationCodeGrant(code);
      const accessToken = data.body["access_token"];
      const refreshToken = data.body["refresh_token"];
      const expiresIn = data.body["expires_in"];

      spotifyApi.setAccessToken(accessToken);
      spotifyApi.setRefreshToken(refreshToken);

      console.log("The access token is " + accessToken);
      console.log("The refresh token is " + refreshToken);

      res.status(200).json({
        message:
          "Login successful! You can now use the /search and /play endpoints.",
        accessToken,
        refreshToken,
        expiresIn,
      });

      setInterval(async () => {
        try {
          const data = await spotifyApi.refreshAccessToken();
          const accessTokenRefreshed = data.body["access_token"];
          spotifyApi.setAccessToken(accessTokenRefreshed);
          console.log("Access token refreshed");
        } catch (error) {
          console.error("Error refreshing access token:", error);
        }
      }, (expiresIn / 2) * 1000);
    } catch (error) {
      console.error("Error getting Tokens:", error);
      res.status(500).send("Error getting tokens");
    }
  }
}

module.exports = Controller;
