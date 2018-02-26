import React from "react";

import { formatTime } from '../../Helper/FormatTime';

class Running extends React.Component {

    static getCurrentModeName(currentMode) {
        let modes = {
            'setting':  'Settings',
            'stop' :    'Finished!',
            'delay':    'Get ready!',
            'start':    'Work it!',
            'rest':     'Break'
        };

        return modes[currentMode];
    }

    render() {
        const { currentSet, timer, currentMode } = this.props;
        return (
            <div>
                <div className={"running-step"}>
                    <span className={"running-step-label"}>Sets</span>
                    <span className={"running-step-heading "}>{currentSet}</span>
                </div>
                <div className={"running-step"}>
                    <div className={"running-step-heading"}>{Running.getCurrentModeName(currentMode)}</div>
                </div>
                <div className={"running-step"}>
                    <div className={"running-step-heading running-step-heading-big"}>{formatTime(timer)}</div>
                </div>
            </div>
        )
    }
}

export default Running;