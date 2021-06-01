import React from 'react';

class SourceSelector extends React.Component {
    constructor(props) {
        super(props);

        this.handleSourceChange = this.handleSourceChange.bind(this);
    }

    handleSourceChange(event) {
        console.log(event);
    }

    render() {
        return (
            <div>
                <input onChange={this.handleSourceChange} type="file"></input>
            </div>
        )
    }
}

export default SourceSelector;