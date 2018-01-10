import {TweenMax, Bounce} from 'gsap';


const duration = 0.7;

export default {
    show (target, cb) {
        return TweenMax
        .from(target, duration, {
            opacity: 0,
            height: 0,
            width: 0,          
            borderBottomLeftRadius: 20000,
            onComplete() {
                cb()
            },
            
        })
    },
    hide(target, cb) {
        return TweenMax
        .to(target, duration, {
            opactiy: 0,
            height: 0,
            onComplete() {
                cb()
            },
            
        })
    }
}