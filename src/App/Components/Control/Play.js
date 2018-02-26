import React from "react";

class Play extends React.Component {
    render() {
        const { onClickPlay } = this.props;
        return (
            <button onClick={onClickPlay}>
                <i className={"material-icons md-48"}>play_arrow</i>
            </button>
        )
    }
}

export default Play;