'use strict';

const { google } = require('googleapis');
const calendar = google.calendar('v3');
const SCOPES = ['https://www.googleapis.com/auth/calendar.events.public.readonly'];

const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;

// Validate environment variables
if (!CLIENT_SECRET || !CLIENT_ID || !CALENDAR_ID) {
  throw new Error('Missing environment variables: CLIENT_SECRET, CLIENT_ID, or CALENDAR_ID');
}

const redirect_uris = ['https://meet-three-zeta.vercel.app'];
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, redirect_uris[0]);

module.exports.getAuthURL = async () => {
  try {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        authUrl,
      }),
    };
  } catch (error) {
    console.error('Auth URL Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ error: 'Failed to generate auth URL' }),
    };
  }
};

module.exports.getAccessToken = async (event) => {
  try {
    const code = decodeURIComponent(`${event.pathParameters.code}`);

    const token = await new Promise((resolve, reject) => {
      oAuth2Client.getToken(code, (error, response) => {
        if (error) {
          console.error('Token Error:', error);
          return reject(error);
        }
        return resolve(response);
      });
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(token),
    };
  } catch (error) {
    console.error('Access Token Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(error),
    };
  }
};

module.exports.getCalendarEvents = async (event) => {
  try {
    const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);

    oAuth2Client.setCredentials({ access_token });

    const events = await new Promise((resolve, reject) => {
      const now = new Date().toISOString();

      calendar.events.list(
        {
          calendarId: CALENDAR_ID,
          auth: oAuth2Client,
          timeMin: now,
          maxResults: 50,
          singleEvents: true,
          orderBy: 'startTime',
        },
        (error, response) => {
          if (error) {
            console.error('Calendar API Error:', error);
            return reject({ message: 'Failed to fetch calendar events', error });
          }
          if (!response || !response.data || !response.data.items) {
            console.error('Invalid response structure:', response);
            return reject({ message: 'No events found or invalid response structure' });
          }
          return resolve(response);
        }
      );
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ events: events.data.items }),
    };
  } catch (error) {
    console.error('Calendar Events Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(error),
    };
  }
};
