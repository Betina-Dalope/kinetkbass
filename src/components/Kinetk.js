import React, { Component } from 'react';
import { TimelineLite, Expo } from 'gsap';



class Kinetk extends Component {

    constructor(props) {
        super(props);

        this.kTimeline = new TimelineLite({paused: true, delay: .5});
    }

    componentDidMount() {

        var arrowTimeline = new TimelineLite();
        arrowTimeline
            .from(this.refs.k1_arrow, .8, {y: "200%", alpha: 0, ease: Expo.easeOut}, "start")
            .from(this.refs.k1_arrow, .4, {x: "-150%", ease: Expo.easeOut}, "start")
            .from(this.refs.k2_arrow, .8, {y: "-200%", alpha: 0, ease: Expo.easeOut}, "start")
            .from(this.refs.k2_arrow, .4, {x: "150%", ease: Expo.easeOut}, "start")


        this.kTimeline
            .from([this.refs.k1, this.refs.k2], 1, { height: 0, alpha: 0, ease: Expo.easeOut})
            .add(arrowTimeline, "-=.25")
            .add("widen", "+=.25")
            .from( this.refs.component, 1.2, { width: 40, ease: Expo.easeOut }, "widen") //hold at this position until loaded
            .from( this.refs.middle_letters, 1.4, { width: 0, alpha: 0}, "widen")
            //.to( this.refs.k2, 1, {rotationY: 180, transformOrigin:"right", x: -27, ease: Expo.easeOut, delay: -1})
            .add("grow", "-=.8")
            .to( this.refs.k2, 1.6, {rotationY: 180, transformOrigin:"right", x: -27, ease: Expo.easeOut}, "grow")
            .to( this.refs.component, 2, {scale: 1.5, transformOrigin:"bottom", delay: .2}, "grow")
            
            .add( "shrink", "-=.2")
           
            .to(this.refs.component, .25, { scale: 1, ease: Expo.easeOut }, "shrink")
            .from( this.refs.component, 1, { left: "50%", top: "50%", x: "-50%", y: "-50%", ease: Expo.easeOut}, "shrink")


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
