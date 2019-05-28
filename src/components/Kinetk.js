import React, { Component } from 'react';
import { TweenMax, TimelineLite } from 'gsap';



class Kinetk extends Component {

    constructor(props) {
        super(props);

        this.kTimeline = new TimelineLite({paused: true});
    }

    drawArrow = () => {
        var arrowTimeline = new TimelineLite();
        arrowTimeline
            .from(this.refs.k1_arrow, .5, {y: "200%", alpha: 0}, "start")
            .from(this.refs.k1_arrow, .25, {x: "-150%"}, "start")
            .from(this.refs.k2_arrow, .5, {y: "-200%", alpha: 0}, "start")
            .from(this.refs.k2_arrow, .25, {x: "150%"}, "start")

        return arrowTimeline;
    }

    componentDidMount() {


        this.kTimeline
            .from([this.refs.k1, this.refs.k2], .5, { height: 0, alpha: 0})
            .add(this.drawArrow())
            .from( this.refs.component, 1, { width: 40, delay: .6 }, "widen") //hold at this position until loaded
            .from( this.refs.middle_letters, 1, { width: 0, alpha: 0, delay: 0.9}, "widen")
            .to( this.refs.k2, .5, {rotationY: 180, transformOrigin:"right", x: -27},  "grow" )
            .to( this.refs.component, 2.5, {scale: 1.5, y: -50}, "grow")
            .to(this.refs.component, .25, { scale: 1, delay: .5}, "shrink")
            .to(this.refs.component, .8, {left: "10%", top: "10%", delay: .5}, "shrink");

            this.kTimeline.play();
    }

    render() {

        return (
            <div ref="component" className="kinetk">
                <div ref="k1" className="k k1">
                    <div ref="k1_arrow" className="k__arrow"></div>
                </div>
                <div ref="middle_letters" className="middle-letters">
                    <span ref="i">I</span>
                    <span ref="n">N</span>
                    <span ref="e">E</span>
                    <span ref="t">T</span>
                </div>
                <div ref="k2" className="k k2">
                    <div ref="k2_arrow" className="k__arrow"></div>
                </div>
            </div>

        );
    }
}

export default Kinetk;
