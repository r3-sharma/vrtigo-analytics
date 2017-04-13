# Vrtigo Analytics for React VR

https://vrtigo.io

### Installation

```shell
npm install --save vrtigo-analytics
```

### Setup 

```javascript
const vrtigo = import vrtigo from 'vrtigo-analytics';
vrtigo.setAppId('<your app id>');
vrtigo.setUserId('<your user id>');
```

### Data Collection
All head pose and analytics metrics tracking is controlled by the API
functions in the table below.  The `start`, `unpause`, `seekEnd`, and
`bufferEnd` functions all require an integer representing the relative
play position in milliseconds (`positionMillis`). 

The `start` function, called when a video initially starts playing,
additionally requires a string indicating the video being viewed
(`videoId`).

It is important to instrument any event where the playback time
changes in the video, such as buffering and seeking/scrubbing, so that
the analytics are in sync with the viewer’s behavior.

### Data Submission

You control when to submit data to Vrtigo. To submit data after
collection has been stopped with the stop function, simply call the
submit function. *Important: call submit after calling stop and before
calling start again.*

| Action          |  API call                               | 
| Start           | vrtigo.start(videoId, positionMillis);  |
| Stop            | vrtigo.stop();                          |
| Pause           | vrtigo.pause()                          |
| Unpause         | vrtigo.unpause(positionMillis);         |
| Seek begin      | vrtigo.seekBegin();                     |
| Seed end        | vrtigo.seekEnd(positionMillis);         |
| Buffering begin | vrtigo.bufferBegin();                   |
| Buffering end   | vrtigo.bufferEnd(positionMillis);       |
| Submit data     | vrtigo.submit();                        |
