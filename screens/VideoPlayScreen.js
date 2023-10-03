import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, StatusBar } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Slider from "react-native-slider";
import dummy_video from '../assets/images/dummy-video.mp4';

const VideoPlayScreen = () => {
    const videoRef = useRef(null);
    const [paused, setPaused] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const toggleMute = () => {
        if (muted) {
            setMuted(false);
            if (volume === 0) {
                setVolume(0.5); // Set a default volume when unmuting
            }
        } else {
            setMuted(true);
            setVolume(0); // Mute by setting volume to 0
        }
    };
    const togglePlayPause = () => {
        setPaused(!paused);
    };

    const toggleFullscreen = () => {
        setFullscreen(!fullscreen);
    };

    const onProgress = (data) => {
        setCurrentTime(data.currentTime);
    };

    const onLoad = (data) => {
        setDuration(data.duration);
    };

    const onEnd = () => {
        setPaused(true);
    };



    const [skipStepSize, setSkipStepSize] = useState(10);
    const [currentSkipStep, setCurrentSkipStep] = useState(0);

    const seek = (time) => {
        videoRef.current.seek(time);
        setCurrentTime(time);
    };
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    const [muted, setMuted] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />
            <TouchableOpacity style={styles.videoContainer} onPress={togglePlayPause}>
                <Video
                    ref={videoRef}
                    source={dummy_video}
                    style={fullscreen ? styles.fullscreenVideo : styles.video}
                    resizeMode={fullscreen ? 'cover' : 'cover'}
                    paused={paused}
                    onProgress={onProgress}
                    onLoad={onLoad}
                    onEnd={onEnd}
                    volume={volume}
                />
            </TouchableOpacity>

            <Slider
                style={styles.volumeSlider}
                minimumValue={0}
                maximumValue={1}
                value={muted ? 0 : volume}
                onSlidingComplete={(value) => setVolume(value)}
                thumbTintColor="transparent"
                minimumTrackTintColor="transparent"
                maximumTrackTintColor="transparent"
            />
            {/* <Slider
                style={styles.volumeSlider}
                minimumValue={0}
                maximumValue={1}
                value={volume}
                onSlidingComplete={(value) => setVolume(value)}
                thumbTintColor="black"
                minimumTrackTintColor="black"
            /> */}
            <View style={[
                styles.controls,
                !fullscreen && { backgroundColor: '#000000' }, 
            ]}>
                <TouchableOpacity onPress={toggleMute} style={{ width: 30 }}>
                    <Icon
                        name={muted ? 'volume-off' : 'volume-up'}
                        size={20}
                        color={fullscreen ? '#FFFFFF' : '#545252'}
                    />
                </TouchableOpacity>
                {/* <Slider
          style={styles.progressSlider}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          onSlidingComplete={seek}
          onValueChange={(value) => setCurrentTime(value)}
          thumbTintColor="#1C1C1C"
          minimumTrackTintColor="#1C1C1C"
        /> */}
                {/* <Text style={styles.timeText}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Text> */}
                <TouchableOpacity onPress={() => seek(currentTime - skipStepSize)}>
                    <Icon name="backward" size={16} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={togglePlayPause} style={styles.playBtn}>
                    <Icon name={paused ? 'play' : 'pause'} size={18} color="#1C1C1C" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => seek(currentTime + 10)}>
                    <Icon name="forward" size={16} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleFullscreen}>
                    <Icon name={fullscreen ? 'compress' : 'expand'} size={20} color={fullscreen ? '#FFFFFF' : '#545252'} />
                </TouchableOpacity>
            </View>




        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    videoContainer: {
        flex: 1,
        alignSelf: 'stretch',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,

    },
    video: {
        flex: 1,
    },
    fullscreenVideo: {
        flex: 1,
        alignSelf: 'stretch',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'transparent',
        padding: 15
    },
    progressSlider: {
        width: 70
    },
    timeText: {
        color: 'black',
    },
    playBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEC217',
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    volumeSlider: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
    },

});

export default VideoPlayScreen;
