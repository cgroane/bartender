import React, {Component} from 'react';
import './BartendTheWorld.css';
import connectWithTransitionGroup from 'connect-with-transition-group';
import HomePageAnimation from './HomePageAnimation';

class BartendTheWorld extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        console.log('component did mount')
    }

    componentDidEnter(cb) {
        console.log("mounted")
        HomePageAnimation.show(this.homeText, cb)
    }
    componentWillAppear(cb) {
        console.log('component appeared')
        HomePageAnimation.show(this.homeText, cb)
    }

    render() {
        return (
            <div className="homePageHeaderTextContainer" ref={ref => this.homeText = ref} >
                <h1 className="homePageHeader" >BARTEND THE WORLD</h1>
            </div>
        )
    }
}

export default BartendTheWorld;