import React from "react";

import Play from "./Play";
import Pause from "./Pause";

class Control extends React.Component {

    isRunning() {
        const { currentMode, isPaused } = this.props;

        return ['delay', 'start', 'rest'].includes(currentMode) && isPaused !== true;
    }

    render() {
        const { onClickPlay, onClickPause } = this.props;
        return (
            <div className={"buttons-control-group"} >
                {this.isRunning() ? (
                    <Pause
                        onClickPause={onClickPause}
                    />
                ) : (
                    <Play
                        onClickPlay={onClickPlay}
                    />
                )}
            </div>
        )
    }
}

export default Control;