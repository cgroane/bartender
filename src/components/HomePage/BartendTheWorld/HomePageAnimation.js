import {TweenMax, Bounce} from 'gsap';
// import SplitText from 'gsap/SplitText';

// export var mySplitText = new SplitText(target, {type: "words, chars"})


const duration = 1.5;


export default {
    show (target, cb) {
        return TweenMax
        .from(target, duration, {
            opacity: 0,
            height: 0,
            width: 0,
            
            onComplete() {
                
            },
          
            
        })
        // .to(target, duration, {
        //     left: 50,
        //     top: 180,
        //     onComplete() {
        
        //     }
        // }) 
    },
    hide(target, cb) {
        return TweenMax
        .to(target, duration, {
            opactiy: 0,
            height: 0,
            onComplete() {
                
            },
            
        })
    }
}