# J Playlist

The YouTube video suggestion system makes watching a collection of videos distracting. In this application, users can watch videos (entire playlists) just like on online educational websites. Playlists can be added to users’ accounts and played directly from this application without any interruptions. I used YouTube Data API for getting the video playlist’s information.

## Running the Application

To run the application on your localhost just run the following commands in your terminal (for Powershell/Git bash).

```
git clone https://github.com/JanayAlam/j-playlist.git
cd j-playlist
copy default.env .env
```

Now you need google developer api key for running the application. Go to [Google Developer Console](https://console.cloud.google.com) and create a new project or select a existing project. Enable 'YouTube Data API v3' API. If an API key hasn't already been created, do so now and copy the key. Now write the key in `.env` file (replace VITE_YOUTUBE_DATA_API_KEY's value).

Now run the following commands to install the required packages and run the application.

```
yarn
yarn run dev
```

Keep in mind that yarn and nodejs must be installed on your machine.
