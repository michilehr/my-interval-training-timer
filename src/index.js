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
            currentSet: null,
            timer: 0
        };

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.tick = this.tick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.previousSettingStep = this.previousSettingStep.bind(this);
        this.nextSettingStep = this.nextSettingStep.bind(this);
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

    stop() {
        this.setState({
            timer: 0
        });
        clearInterval(this.interval);
    }

    start() {
        this.stop();

        this.setState({
            timer: this.state.settingDelay,
            currentMode: 'delay',
            currentSet: this.state.settingSets,
        });

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

        console.log('clicked');
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
                currentSet: this.state.currentSet - 1,
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
                        <div className={"running-step-heading running-step-heading-big"}>{this.state.timer}</div>
                    </div>
                </div>
            );
        };

        var buttonsControl = (
            <div className={"buttons-control-group"} >
                <button onClick={this.start}>
                    <i className={"material-icons md-48"}>play_arrow</i>
                </button>
            </div>
        );

        var buttonSettingsLeft = (
            <button className={"button-settings button-settings-left" + (this.state.currentSettingStep < 1 || this.state.currentMode !== 'setting' ? " hidden" : "")} onClick={this.previousSettingStep}>
                <i className={"material-icons"}>chevron_left</i>
            </button>
        );

        var buttonSettingsRight = (
            <button className={"button-settings button-settings-right" + (this.state.currentSettingStep > 1 || this.state.currentMode !== 'setting' ? " hidden" : "")} onClick={this.nextSettingStep}>
                <i className={"material-icons"}>chevron_right</i>
            </button>
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