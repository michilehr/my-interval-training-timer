import '../css/index.css';

import React from "react";

import Control from "./Components/Control/Control";
import Content from "./Components/Content/Content";

class App extends React.Component {

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
        this.handleChangeSetting = this.handleChangeSetting.bind(this);
        this.pause = this.pause.bind(this);
    }

    handleChangeSetting(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value});
    }

    tick() {
        this.setState({
            timer: (this.state.currentMode !== "stop") ? this.state.timer - 1 : parseInt(this.state.timer) + 1
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

    handleMode() {
        let nextMode;

        // TODO: needs cleanup to make ot more robust
        if (this.state.timer !== 0) {
            return;
        }

        let currentMode = this.state.currentMode;

        if (currentMode === 'delay') {
            nextMode = 'start';
            this.setState({
                timer: this.state.settingTimer
            });
        } else if (currentMode === 'start' && this.state.currentSet > 0) {
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
            this.setState({
                timer: 0
            });
        }

        this.setState({
            currentMode: nextMode,
        });
    }

    render() {
        return(
            <div className={"container bg bg-" + (this.state.currentMode)}>
                <div className={"content text-center"}>
                    <Content
                        currentMode={this.state.currentMode}
                        currentSet={this.state.currentSet}
                        timer={this.state.timer}
                        settingRest={this.state.settingRest}
                        settingSets={this.state.settingSets}
                        settingTimer={this.state.settingTimer}
                        handleChangeSetting={this.handleChangeSetting}
                        handleChangeSettingStep={this.handleChangeSettingStep}
                    />
                    <Control
                        currentMode={this.state.currentMode}
                        isPaused={this.state.isPaused}
                        onClickPause={this.pause}
                        onClickPlay={this.start}
                    />
                </div>
            </div>
        )
    }
}

export default App;