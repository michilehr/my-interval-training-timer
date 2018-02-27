import React from "react";

class Settings extends React.Component {

    constructor(props,) {
        super(props);

        this.state = {
            currentSettingStep: 0,
        };

        this.handleChangeSettingStep = this.handleChangeSettingStep.bind(this);
    }

    handleChangeSettingStep(previous = false) {
        this.setState({
            currentSettingStep: this.state.currentSettingStep += (previous ? -1 : +1)
        });
    }

    render() {
        const {
            currentMode,
            settingTimer,
            settingSets,
            settingRest,
            handleChangeSetting
        } = this.props;

        return (
            <div>
                <form>
                    <div className={"setting" + (this.state.currentSettingStep === 0 ? " current" : "")}>
                        <label>Timer</label>
                        <input type="text" name="settingTimer" value={settingTimer} onChange={handleChangeSetting} />
                    </div>
                    <div className={"setting" + (this.state.currentSettingStep === 1 ? " current" : "")}>
                        <label>Sets</label>
                        <input type="text" name="settingSets" value={settingSets} onChange={handleChangeSetting} />
                    </div>
                    <div className={"setting" + (this.state.currentSettingStep === 2 ? " current" : "")}>
                        <label>Rest</label>
                        <input type="text" name="settingRest" value={settingRest} onChange={handleChangeSetting} />
                    </div>

                </form>
                <div className={"button-settings-container button-settings-container-left"} >
                    <button className={"button-settings" + (this.state.currentSettingStep < 1 || currentMode !== 'setting' ? " hidden" : "")} onClick={() => this.handleChangeSettingStep(true)}>
                        <i className={"material-icons"}>chevron_left</i>
                    </button>
                </div>
                <div className={"button-settings-container button-settings-container-right"} >
                    <button className={"button-settings" + (this.state.currentSettingStep > 1 || currentMode !== 'setting' ? " hidden" : "")} onClick={() => this.handleChangeSettingStep()}>
                        <i className={"material-icons"}>chevron_right</i>
                    </button>
                </div>
            </div>
        )
    }
}

export default Settings;