import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';


class MainWrapper extends React.Component {

    constructor(props,) {
        super(props);

        this.state = {
            currentMode: 'setting',
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
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value});
    }

    tick() {
        this.setState({
            timer: this.state.timer - 1
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

    handleMode() {
        var nextMode;

        if (this.state.timer != 0) {
            return;
        }

        var currentMode = this.state.currentMode;

        if (currentMode == 'delay') {
            nextMode = 'start';
            this.setState({
                timer: this.state.settingTimer
            });
        } else if (currentMode == 'start') {
            nextMode = this.state.settingRest > 0 ? 'rest' : 'start';
            this.setState({
                currentSet: this.state.currentSet - 1,
                timer: this.state.settingRest > 0 ? this.state.settingRest : this.state.settingTimer
            });
        } else if (currentMode == 'rest') {
            nextMode = 'start';
            this.setState({
                timer: this.state.settingTimer
            });
        }

        if (this.state.currentSet === 0) {
            nextMode = 'stop';
            this.stop();
        }

        this.setState({
            currentMode: nextMode,
        });
    }

    render() {

        return(
            <div className={"container bg bg-" + (this.state.currentMode)}>
                <div className={"content text-center"}>
                    <form>
                        <div>
                            <label>Timer</label>
                            <input type="text" name="settingTimer" value={this.state.settingTimer} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label>Sets</label>
                            <input type="text" name="settingSets" value={this.state.settingSets} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label>Rest</label>
                            <input type="text" name="settingRest" value={this.state.settingRest} onChange={this.handleChange} />
                        </div>
                    </form>

                    <button onClick={this.start}>Run</button>
                    <h2>Sets: {this.state.currentSet}</h2>
                    <h2>{this.state.currentMode}</h2>
                    <div>{this.state.timer}</div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<MainWrapper />, document.getElementById('root'));