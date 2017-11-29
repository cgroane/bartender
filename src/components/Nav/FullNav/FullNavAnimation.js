import {TweenMax, Elastic} from 'gsap';


const duration = 1;

export default {
    show (target, cb) {
        return TweenMax
        .from(target, duration, {
            opacity: 0,
            height: 0,
            onComplete() {
                cb(console.log('cb'));
            },
            ease: Elastic.easeOut.config(0.25, 1),
        })
    },
    hide(target, cb) {
        return TweenMax
        .to(target, duration, {
            opactiy: 0,
            height: 0,
            onComplete() {
                cb(console.log('cb'));
            },
            ease: Elastic.easeIn.config(0.25, 1)
        })
    }
}