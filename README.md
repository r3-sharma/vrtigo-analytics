# Vrtigo A-Frame analytics package

This plugin will allow you to capture the following data:
- Frames Per Second (fps)
- Head pose (in Quaternion form)
- Session length
- Session time stamp
- Battery (charging, levels, time left)

## Help and Support
- [Documentation](http://developer.vrtigo.io/)
- Email - hello@vrtigo.io
- [Bug reports](https://github.com/vrtigo/vrtigo-webvr/issues)
- Express help: 140 characters or less [@vrtigoio](https://twitter.com/vrtigoio) on twitter
- [Example project](https://github.com/vrtigo/vrtigo-webvr-example)


##How to run and use

Visit [vrtigo.io](https://vrtigo.io) to create an account and view your dashboard.

Install the package through npm:
```shell
npm install -s vrtigo-analytics
```
and add this line to the "main" file (defined in package.json):

```javascript
import {setUserId, setAppId, addEvent, setPoseFrequency,
        setRenderFrequency, setBatteryFrequency, setSampler} from 'vrtigo-analytics'
```

The minimum installation requires setting `setUserId()` with a unique user identifier, and `setAppId()` with your `APP_ID`.  Use `addEvent(event)` to add an event to be tracked.

Use `setPoseFrequency()`, `setRenderFrequency()`, and `setBatteryFrequency()` to set the frequencies for collecting data. These default to 200, 1000, and 1000 respectively.

In your `index.html` file include a `<a-entity>` tag called `vrtigo` with nothing else attached. This will allow the FPS to be calculated.

For example:

```html
<a-scene>
  <a-videosphere src="#vid" rotation="0 180 0"></a-videosphere>
  <a-entity vrtigo></a-entity>
</a-scene>
```

To start collecting data, call the ```setSampler()``` function with a value of true. To stop collecting data call ```setSampler(false)```.

##How was this created?
The Vrtigo analytics plugin was created mostly using WebVR and WebGL calls. The only A-Frame specific data is frames per second. In the near future we will also be creating a generic WebVR version of this plugin for those of you not using A-Frame.
