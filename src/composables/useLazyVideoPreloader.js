import { ref, onMounted, onUnmounted } from 'vue'

export function useLazyVideoPreloader(targetRef, mediaUrls, options = { rootMargin: '200px' }) {
  const isSectionVisible = ref(false)
  const preloadedUrls = new Set()
  let observer = null

  const getMediaList = () => {
    return Array.isArray(mediaUrls) ? mediaUrls : mediaUrls.value || []
  }

  const preloadNext = (currentIndex = 0) => {
    if (typeof window === 'undefined') return

    const list = getMediaList()
    if (!list.length) return

    const nextIdx = (currentIndex + 1) % list.length
    const nextUrl = list[nextIdx]

    if (nextUrl && !preloadedUrls.has(nextUrl)) {
      preloadedUrls.add(nextUrl)

      const tempVideo = document.createElement('video')
      tempVideo.src = nextUrl
      tempVideo.preload = 'auto'
    }
  }

  onMounted(() => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window && targetRef?.value) {
      observer = new IntersectionObserver((entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          isSectionVisible.value = true
          preloadNext(0)
          observer.disconnect()
        }
      }, options)

      observer.observe(targetRef.value)
    } else {
      isSectionVisible.value = true
      preloadNext(0)
    }
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    isSectionVisible,
    preloadNext
  }
}

