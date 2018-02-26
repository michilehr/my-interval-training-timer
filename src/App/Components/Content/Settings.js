import React from "react";

class Settings extends React.Component {

    render() {
        const {
            currentSettingStep,
            currentMode,
            settingTimer,
            settingSets,
            settingRest,
            handleChangeSetting,
            handleChangeSettingStep
        } = this.props;

        return (
            <div>
                <form>
                    <div className={"setting" + (currentSettingStep === 0 ? " current" : "")}>
                        <label>Timer</label>
                        <input type="text" name="settingTimer" value={settingTimer} onChange={handleChangeSetting} />
                    </div>
                    <div className={"setting" + (currentSettingStep === 1 ? " current" : "")}>
                        <label>Sets</label>
                        <input type="text" name="settingSets" value={settingSets} onChange={handleChangeSetting} />
                    </div>
                    <div className={"setting" + (currentSettingStep === 2 ? " current" : "")}>
                        <label>Rest</label>
                        <input type="text" name="settingRest" value={settingRest} onChange={handleChangeSetting} />
                    </div>

                </form>
                <div className={"button-settings-container button-settings-container-left"} >
                    <button className={"button-settings" + (currentSettingStep < 1 || currentMode !== 'setting' ? " hidden" : "")} onClick={() => handleChangeSettingStep(true)}>
                        <i className={"material-icons"}>chevron_left</i>
                    </button>
                </div>
                <div className={"button-settings-container button-settings-container-right"} >
                    <button className={"button-settings" + (currentSettingStep > 1 || currentMode !== 'setting' ? " hidden" : "")} onClick={() => handleChangeSettingStep()}>
                        <i className={"material-icons"}>chevron_right</i>
                    </button>
                </div>
            </div>
        )
    }
}

export default Settings;