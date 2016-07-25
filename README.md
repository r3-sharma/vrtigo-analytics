# Vrtigo A-Frame analytics package

This plugin will allow you to capture the following data:
- Frames Per Second (fps)
- Head pose (in Quaternion form)
- Session length
- Session time stamp
- Battery (charging, levels, time left)

## Help and Support
- [Documentation](https://github.com/vrtigo/vrtigo-webvr)
- Email - hello@vrtigo.io
- [Bug reports](https://github.com/vrtigo/vrtigo-webvr/issues)
- Express: 140 characters or less [@vrtigoio](https://twitter.com/vrtigoio) on twitter


##How to run and use

Visit [vrtigo.io](https://vrtigo.io) to create an account to view your dashboard.

After installing through npm, you will need to incorporate the following line into the "main"(from your package.json) of your file.

```import {addUserID,``` addAppID, addEvent, setPoseFrequency, setRenderFrequency, setBatteryFrequency} from 'vrtigo-analytics'```

Use `addUserID()` and `addAppID()` to add the needed information to view the data.
Use `addEvent(event)` to add an event to be tracked.

Use ```setPoseFrequency, setRenderFrequency, setBatteryFrequency``` to set the frequencies for collecting data. These are defaulted to 200, 1000, and 1000 respectively.

In your Index.html file include an <a-entity> called vrtigo with nothing else attached. This will allow the FPS to be calculated.


For example:

```
<a-scene>
  <a-videosphere src="#vid" rotation="0 180 0"></a-videosphere>
  <a-entity vrtigo></a-entity>
</a-scene>
```

##How was this created?
The Vrtigo analytics plugin was created mostly using WebVR and WebGL calls. The only A-Frame specific data is frames per second. In the near future we will also be creating a generic WebVR version of this plugin for those of you not using A-Frame.
