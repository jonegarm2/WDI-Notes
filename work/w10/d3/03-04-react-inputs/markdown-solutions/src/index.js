import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import marked from 'marked'

class DisplayContainer extends Component {

    constructor() {
        super() 
        this.state = {
            value: ""
        }
    }


    updateState = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    markdownToHTML = (markup) => {
        let rawMarkup = marked(markup);
        console.log(rawMarkup)
        return { __html: rawMarkup };
    }

    render() {
        return (
            <div>
                <RawInput updateState={this.updateState} />
                <span dangerouslySetInnerHTML={this.markdownToHTML(this.state.value)} />
            </div>
        )
    }


}

const RawInput = (props) => {
    return (
        <textarea rows="20" cols="35" onChange={props.updateState} />
    )
}

ReactDOM.render(<DisplayContainer />, document.getElementById('root'))