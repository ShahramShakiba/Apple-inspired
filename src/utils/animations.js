import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export const animateWithGsap = (target, animationProps, scrollProps) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...scrollProps,
    },
  });
};

export const animateWithGsapTimeline = (
  timeLine,
  rotationRef,
  rotationState,
  firstTarget,
  secondTarget,
  animationProps
) => {
  timeLine.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: 'power2.inOut',
  });

  timeLine.to(
    firstTarget,
    {
      ...animationProps,
      ease: 'power2.inOut',
    },
    '<' // to insert the animation at the start of the previous-animation
  );

  timeLine.to(
    secondTarget,
    {
      ...animationProps,
      ease: 'power2.inOut',
    },
    '<'
  );
};


/*            "Model.jsx"
    timeLine = timeLine

    rotationRef = small   // actual Model

    rotationState = smallRotation

    firstTarget =  '#view1'

    secondTarget = '#view2'

    animationProps =  {
                        transform: 'translateX(-100%)',
                        duration: 2,
                      }
*/