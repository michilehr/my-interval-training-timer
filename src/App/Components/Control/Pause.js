import React from "react";

class Pause extends React.Component {
    render() {
        const { onClickPause } = this.props;
        return (
            <button onClick={onClickPause}>
                <i className={"material-icons md-48"}>pause</i>
            </button>
        )
    }
}

export default Pause;