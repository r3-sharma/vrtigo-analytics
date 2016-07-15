# Aframe Analytics package


####This plugin will allow you to capture the following pieces of data:
- Frames Per Second(fps)
- Pose Data (in Quaternion form)
- Session length
- Session Time stamp
- Battery Data (charging, levels, time left)

##Help and Support
- [Documentation] (https://github.com/vrtigo/vrtigo-webvr)
- Email - hello@vrtigo.io
- [Bug reports] (https://github.com/vrtigo/vrtigo-webvr/issues)
- Express: 140 characters or less [@vrtigoio] (https://twitter.com/vrtigoio) on twitter


##How to run and use

Visit (vrtigo.io)[https://vrtigo.io] to create an account to view your dashboard.
Use ```addUserID()``` and ```addAppID()``` to add the needed information to view the data.
Use ```addEvent(event)``` to add an event to be tracked.

In your Index.html file include an <a-entity> called vrtigo with nothing else attached. This will allow the FPS to be calculated.

For example:

```
<a-scene>
  <a-videosphere src="#vid" rotation="0 180 0"></a-videosphere>
  <a-entity vrtigo></a-entity>
</a-scene>
```

##How was this created?
The VRTIGO analytics plugin was created mostly using WebVR and WebGL calls. The only A-Frame specific data is frames per second. In the near future we will also be creating a generic WebVR version of this plugin for those of you not using A-frame.
