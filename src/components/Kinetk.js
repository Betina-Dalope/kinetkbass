import React, { Component } from 'react';
import { TweenMax, TimelineLite } from 'gsap';



class Kinetk extends Component {

    constructor(props) {
        super(props);

        this.kTimeline = new TimelineLite({paused: true});
    }

    componentDidMount() {
        this.kTimeline
            .from([this.refs.k1, this.refs.k2], 1, { height: 0})
            .from( this.refs.component, 3, { width: 20 });

        this.kTimeline.play();
    }

    render() {

        return (
            <div ref="component" className="kinetk">
                <div ref="k1" className="k k1"></div>
                {/* <span>I</span>
                <span>N</span>
                <span>E</span>
                <span>T</span> */}
                <div ref="k2" className="k k2"></div>
            </div>

        );
    }
}

export default Kinetk;
