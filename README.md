# Vrtigo Analytics for React VR

https://vrtigo.io

### Installation

```shell
npm install --save vrtigo-reactvr
```

### Setup 

```javascript
const vrtigo = import vrtigo from 'vrtigo-reactvr';
vrtigo.setAppId('<your app id>');
vrtigo.setUserId('<your user id>');
```

Please contact Vrtigo to obtain an app id for your React VR
application.

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

<table>
<tr>
<td><b>Action</b></td>
<td><b>API call</b></td>
</tr>
<tr>
<td>Start</td>
<td>vrtigo.start(videoId, positionMillis);</td>
</tr>
<tr>
<td>Stop</td>
<td>vrtigo.stop()</td>
</tr>
<tr>
<td>Pause</td>
<td>vrtigo.pause()</td>
</tr>
<tr>
<td>Unpause</td>
<td>vrtigo.unpause(positionMillis)</td>
</tr>
<tr>
<td>Seek begin</td>
<td>vrtigo.seekBegin()</td>
</tr>
<tr>
<td>Seek end</td>
<td>vrtigo.seekEnd(positionMillis)</td>
</tr>
<tr>
<td>Buffering begin</td>
<td>vrtigo.bufferBegin()</td>
</tr>
<tr>
<td>Buffering end</td>
<td>vrtigo.bufferEnd(positionMillis)</td>
</tr>
<tr>
<td>Submit data</td>
<td>vrtigo.submit()</td>
</tr>
</table>
