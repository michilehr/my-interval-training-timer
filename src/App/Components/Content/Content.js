import React from "react";

import Running from "./Running";
import Settings from "./Settings";

class Content extends React.Component {

    render() {
        const {
            currentSet,
            timer,
            currentMode,
            settingTimer,
            settingSets,
            settingRest,
            handleChangeSetting,
    } = this.props;

        let content;

        if (currentMode === 'setting') {
            content = (
                <Settings
                    settingTimer={settingTimer}
                    settingSets={settingSets}
                    settingRest={settingRest}
                    currentMode={currentMode}
                    handleChangeSetting={handleChangeSetting}
                />
            );
        } else {
            content = (
                <Running
                    currentSet={currentSet}
                    currentMode={currentMode}
                    timer={timer}
                />
            );
        }

        return (
            content
        )
    }
}

export default Content;