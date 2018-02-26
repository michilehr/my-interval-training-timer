import React from "react";

import Play from "./Play";
import Pause from "./Pause";

class Control extends React.Component {
    render() {
        const { currentMode, isPaused, onClickPlay, onClickPause } = this.props;
        return (
            <div className={"buttons-control-group"} >
                {['delay', 'start', 'rest'].includes(currentMode) && isPaused !== true ? (
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