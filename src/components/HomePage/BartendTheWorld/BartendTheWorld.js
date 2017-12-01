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

    componentWillEnter(cb) {
        console.log("mounted")
        HomePageAnimation.show(this.homePageText, cb)
    }

    render() {
        return (
            <div className="homePageHeaderTextContainer" ref={ref => this.homePageText = ref} >
                <h1 className="homePageHeader" >BARTEND THE WORLD</h1>
            </div>
        )
    }
}

export default BartendTheWorld;