# Vrtigo Analytics for React VR

https://vrtigo.io

### Installation

```shell
npm install --save vrtigo-reactvr
```
### Setup 

```javascript
const vrtigo = import vrtigo from 'vrtigo-reactvr';
vrtigo.setAppId('<Your App Id>');
vrtigo.setUserId('<Your User Id>');
```

Please contact <support@vrtigo.io> to obtain an App Id for your React VR
application.

### Introduction

Vrtigo collects and processes metrics in 360 video applications. The
`vrtigo-reactvr` package allows developers to integrate Vrtigo into
their React VR applications that make use of 360 content.

### Data Collection

All data collection and submission are controlled by the Vrtigo API
functions in the table below.  The `start`, `unpause`, `seekEnd`, and
`bufferEnd` functions all require an integer representing the relative
play position of the video in milliseconds (`positionMillis`). 

The `start` function, called when a video initially starts playing,
additionally requires a string indicating the video being viewed
(`videoId`).

It is important to instrument any event where the playback time
changes in the video, such as buffering and seeking/scrubbing, so that
the analytics are in sync with the viewer’s behavior.

### Data Submission

You control when to send data to Vrtigo. To send data after video
playback ends, simply call the `submit` function after calling the
`stop` function. *Important: call submit after calling stop and before
calling start again.* The `submit` function returns a Promise object,
so be sure to `catch` any potential errors when calling it.

<table>
<tr>
<td><b>Action</b></td>
<td><b>API call</b></td>
</tr>
<tr>
<td>Start</td>
<td><code>vrtigo.start(videoId, positionMillis);</code></td>
</tr>
<tr>
<td>Stop</td>
<td><code>vrtigo.stop()</code></td>
</tr>
<tr>
<td>Pause</td>
<td><code>vrtigo.pause()</code></td>
</tr>
<tr>
<td>Unpause</td>
<td><code>vrtigo.unpause(positionMillis)</code></td>
</tr>
<tr>
<td>Seek begin</td>
<td><code>vrtigo.seekBegin()</code></td>
</tr>
<tr>
<td>Seek end</td>
<td><code>vrtigo.seekEnd(positionMillis)</code></td>
</tr>
<tr>
<td>Buffering begin</td>
<td><code>vrtigo.bufferBegin()</code></td>
</tr>
<tr>
<td>Buffering end</td>
<td><code>vrtigo.bufferEnd(positionMillis)</code></td>
</tr>
<tr>
<td>Submit data</td>
<td><code>vrtigo.submit()</code></td>
</tr>
</table>
