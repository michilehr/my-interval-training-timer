import React from "react";

import audioPipe from './Media/Pipes.mp3';

const audio = new Audio(audioPipe);

class AudioNotification extends React.Component {

    play(muted = false) {
        audio.muted = false;

        if (muted) {
            audio.muted = true;
            audio.play();
        } else {
            audio.play();
        }
    }

    render() {
        const {
            currentMode,
            timer,
            isPaused
        } = this.props;

        const playModes = ['delay', 'start', 'rest'];

        if (
            playModes.includes(currentMode) &&
            timer <= 3 &&
            !isPaused
        ) {
            this.play();
        }

        return (null)
    }
}

export default AudioNotification;