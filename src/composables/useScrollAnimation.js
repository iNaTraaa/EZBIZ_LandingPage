import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation() {
  /**
   * Fade in animation triggered on scroll
   * @param {string | Element} target 
   * @param {Object} options 
   */
  const animateFadeIn = (target, options = {}) => {
    return gsap.from(target, {
      opacity: 0,
      y: options.y ?? 40,
      duration: options.duration ?? 1,
      ease: options.ease ?? 'power3.out',
      scrollTrigger: {
        trigger: target,
        start: options.start ?? 'top 85%',
        toggleActions: options.toggleActions ?? 'play none none reverse',
        ...options.scrollTrigger
      }
    })
  }

  /**
   * Staggered animation for list of items (cards, features, etc.)
   * @param {string | Array<Element>} targets 
   * @param {Object} options 
   */
  const animateStagger = (targets, options = {}) => {
    return gsap.from(targets, {
      opacity: 0,
      y: options.y ?? 50,
      duration: options.duration ?? 0.8,
      stagger: options.stagger ?? 0.15,
      ease: options.ease ?? 'power3.out',
      scrollTrigger: {
        trigger: options.trigger || targets,
        start: options.start ?? 'top 80%',
        toggleActions: options.toggleActions ?? 'play none none reverse',
        ...options.scrollTrigger
      }
    })
  }

  /**
   * Number Counter animation on scroll
   * @param {Element} element 
   * @param {number} endValue 
   * @param {string} suffix 
   */
  const animateCounter = (element, endValue, suffix = '') => {
    const obj = { val: 0 }
    gsap.to(obj, {
      val: endValue,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        once: true
      },
      onUpdate: () => {
        if (element) {
          element.textContent = Math.floor(obj.val).toLocaleString() + suffix
        }
      }
    })
  }

  /**
   * Cleanup method for components unmounting
   */
  const refreshScrollTrigger = () => {
    ScrollTrigger.refresh()
  }

  return {
    gsap,
    ScrollTrigger,
    animateFadeIn,
    animateStagger,
    animateCounter,
    refreshScrollTrigger
  }
}

