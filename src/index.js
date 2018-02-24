import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';


class MainWrapper extends React.Component {

    constructor(props,) {
        super(props);

        this.state = {
            currentMode: 'setting',
            currentSettingStep: 0,
            settingDelay: 5,
            settingTimer: 3,
            settingRest: 2,
            settingSets: 2,
            currentSet: 0,
            timer: 0,
            isPaused: false
        };

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.tick = this.tick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.previousSettingStep = this.previousSettingStep.bind(this);
        this.nextSettingStep = this.nextSettingStep.bind(this);
        this.pause = this.pause.bind(this);
        this.getTimerFormated = this.getTimerFormated.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value});
    }

    getCurrentModeName() {
        var modes = {
            'setting':  'Settings',
            'stop' :    'Finished!',
            'delay':    'Get ready!',
            'start':    'Work it!',
            'rest':     'Break'
        };

        return  modes[this.state.currentMode];
    }

    tick() {
        this.setState({
            timer: (this.state.currentMode !== "stop") ? this.state.timer - 1 : this.state.timer + 1
        });

        this.handleMode();
    }

    pause() {
        this.setState({
            isPaused: !this.state.isPaused
        });

        if (this.state.isPaused) {
            this.interval = setInterval(this.tick, 1000);
        } else {
            clearInterval(this.interval);
        }
    }

    stop() {
        this.setState({
            timer: 0
        });
        clearInterval(this.interval);
    }

    start() {

        if (!this.state.isPaused) {
            this.stop();

            this.setState({
                timer: this.state.settingDelay,
                currentMode: 'delay',
                currentSet: this.state.settingSets,
            });
        } else {
            this.setState({
                isPaused: false
            });
        }

        this.interval = setInterval(this.tick, 1000);
    }

    previousSettingStep() {
        this.setState({
            currentSettingStep: this.state.currentSettingStep - 1
        });
    }

    nextSettingStep() {
        this.setState({
            currentSettingStep: this.state.currentSettingStep + 1
        });
        }

    getTimerFormated() {

        var minutes = "0" + Math.floor(this.state.timer / 60).toString();
        var seconds = "0" + (this.state.timer - minutes * 60).toString();

        return minutes.toString().slice(-2) + ":" + seconds.slice(-2);
    }

    handleMode() {
        var nextMode;

        if (this.state.timer !== 0) {
            return;
        }

        var currentMode = this.state.currentMode;

        if (currentMode === 'delay') {
            nextMode = 'start';
            this.setState({
                timer: this.state.settingTimer
            });
        } else if (currentMode === 'start') {
            nextMode = this.state.settingRest > 0 ? 'rest' : 'start';
            this.setState({
                currentSet: this.state.currentSet > 0 ? this.state.currentSet - 1 : 0,
                timer: this.state.settingRest > 0 ? this.state.settingRest : this.state.settingTimer
            });
        } else if (currentMode === 'rest') {
            nextMode = 'start';
            this.setState({
                timer: this.state.settingTimer
            });
        }

        if (this.state.currentSet === 0) {
            nextMode = 'stop';
        }

        this.setState({
            currentMode: nextMode,
        });
    }

    render() {
        var content;

        if (this.state.currentMode === 'setting') {
            content = (
                <form>
                    <div className={"setting" + (this.state.currentSettingStep === 0 ? " current" : "")}>
                        <label>Timer</label>
                        <input type="text" name="settingTimer" value={this.state.settingTimer} onChange={this.handleChange} />
                    </div>
                    <div className={"setting" + (this.state.currentSettingStep === 1 ? " current" : "")}>
                        <label>Sets</label>
                        <input type="text" name="settingSets" value={this.state.settingSets} onChange={this.handleChange} />
                    </div>
                    <div className={"setting" + (this.state.currentSettingStep === 2 ? " current" : "")}>
                        <label>Rest</label>
                        <input type="text" name="settingRest" value={this.state.settingRest} onChange={this.handleChange} />
                    </div>
                </form>
            );
        } else {
            content = (
                <div>
                    <div className={"running-step"}>
                        <span className={"running-step-label"}>Sets</span>
                        <span className={"running-step-heading "}>{this.state.currentSet}</span>
                    </div>
                    <div className={"running-step"}>
                        <div className={"running-step-heading"}>{this.getCurrentModeName()}</div>
                    </div>
                    <div className={"running-step"}>
                        <div className={"running-step-heading running-step-heading-big"}>{this.getTimerFormated()}</div>
                    </div>
                </div>
            );
        };

        var buttonsControl = (
            <div className={"buttons-control-group"} >
                {['delay', 'start', 'rest'].includes(this.state.currentMode) && this.state.isPaused !== true ? (
                    <button onClick={this.pause}>
                        <i className={"material-icons md-48"}>pause</i>
                    </button>
                ) : (
                    <button onClick={this.start}>
                        <i className={"material-icons md-48"}>play_arrow</i>
                    </button>                )}
            </div>
        );

        var buttonSettingsLeft = (
            <div className={"button-settings-container button-settings-container-left"}>
                <button className={"button-settings" + (this.state.currentSettingStep < 1 || this.state.currentMode !== 'setting' ? " hidden" : "")} onClick={this.previousSettingStep}>
                    <i className={"material-icons"}>chevron_left</i>
                </button>
            </div>
        );

        var buttonSettingsRight = (
            <div className={"button-settings-container button-settings-container-right"}>
                <button className={"button-settings" + (this.state.currentSettingStep > 1 || this.state.currentMode !== 'setting' ? " hidden" : "")} onClick={this.nextSettingStep}>
                    <i className={"material-icons"}>chevron_right</i>
                </button>
            </div>
        );

        return(
            <div className={"container bg bg-" + (this.state.currentMode)}>
                <div className={"content text-center"}>
                    {content}
                    {buttonsControl}
                    {buttonSettingsLeft}
                    {buttonSettingsRight}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<MainWrapper />, document.getElementById('root'));