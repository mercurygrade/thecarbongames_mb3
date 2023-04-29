import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  PermissionsAndroid,
  Button,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NodeCameraView, NodePlayerView} from 'react-native-nodemediaclient';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [publishBtnTitle, setPublishBtnTitle] = useState('');
  const [isPublish, setIsPublish] = useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const vbRef = useRef();
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ],
        {
          title: 'Cool Photo App Camera And Microphone Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <NodeCameraView
          style={{height: 400}}
          ref={vbRef}
          outputUrl={
            'rtmp://live5in.thetavideoapi.com/live/2453b0ceae0f4aaf0b88c8f0973a5ae1562754d652b90f3be81bb8e57599d5fe2c9732501ad57aaac739244d1d73eb7c81df25607a6f78a6dd11ca26f61a8a27fad365e9e1a5034d674d0d8707e95d208034fe878945caf15fb5c68807659d17c24e80484793e6e6adc52f9df2e5e2a2'
          }
          camera={{cameraId: 1, cameraFrontMirror: true}}
          audio={{bitrate: 32000, profile: 1, samplerate: 44100}}
          video={{
            preset: 12,
            bitrate: 400000,
            profile: 1,
            fps: 15,
            videoFrontMirror: false,
          }}
          autopreview={true}
        />

        <NodePlayerView
          style={{height: 200}}
          //inputUrl={ } //https://live5.thetavideoapi.com/hls/live/2015862/hls_streamer_us_central_0007/playlist.m3u8
          scaleMode={'ScaleAspectFit'}
          bufferTime={300}
          maxBufferTime={1000}
          autoplay={true}
        />

        <Button title="request permissions" onPress={requestCameraPermission} />
        <Button
          onPress={() => {
            if (isPublish) {
              setPublishBtnTitle('Start Publish');
              setIsPublish(false);
              //@ts-ignore
              vbRef.current.stop();
            } else {
              setPublishBtnTitle('Stop Publish');
              setIsPublish(true);
              //@ts-ignore
              vbRef.current.start();
            }
          }}
          title={publishBtnTitle}
          color="#841584"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
