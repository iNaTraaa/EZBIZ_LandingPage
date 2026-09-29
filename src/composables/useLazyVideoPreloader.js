import { ref, onMounted, onUnmounted } from 'vue'

const CACHE_NAME = 'ezbiz-media-cache-v1'

export function useLazyVideoPreloader(targetRef, mediaUrls, options = { rootMargin: '200px' }) {
  const isSectionVisible = ref(false)
  const cachedUrls = ref({})
  const preloadedUrls = new Set()
  const createdBlobUrls = new Set()
  let observer = null

  const getMediaList = () => {
    return Array.isArray(mediaUrls) ? mediaUrls : mediaUrls.value || []
  }

  // Preload video directly into Cache API (window.caches) and convert to Blob URL
  const preloadUrl = async (url, force = false) => {
    if (!url || typeof window === 'undefined') return
    if (!force && preloadedUrls.has(url)) return
    preloadedUrls.add(url)

    try {
      if ('caches' in window) {
        const cache = await caches.open(CACHE_NAME)
        let response = await cache.match(url)

        if (!response) {
          const fetchRes = await fetch(url)
          if (fetchRes.ok) {
            // Clone response before putting into cache because response body can only be consumed once
            await cache.put(url, fetchRes.clone())
            response = fetchRes
          }
        }

        if (response && response.ok) {
          const blob = await response.blob()
          const blobUrl = URL.createObjectURL(blob)
          createdBlobUrls.add(blobUrl)
          cachedUrls.value[url] = blobUrl
          return blobUrl
        }
      }
    } catch (e) {
      console.warn('Cache API fallback to fetch:', e)
    }

    // Fallback: standard fetch
    try {
      const res = await fetch(url)
      const blob = await res.blob()
      const blobUrl = URL.createObjectURL(blob)
      createdBlobUrls.add(blobUrl)
      cachedUrls.value[url] = blobUrl
      return blobUrl
    } catch (err) {
      cachedUrls.value[url] = url
      return url
    }
  }

  const getCachedSrc = (url) => {
    return cachedUrls.value[url] || url
  }

  const preloadNext = (currentIndex = 0) => {
    const list = getMediaList()
    if (!list.length) return
    const nextIdx = (currentIndex + 1) % list.length
    const nextUrl = list[nextIdx]
    preloadUrl(nextUrl, true)
  }

  const preloadAll = async () => {
    const list = getMediaList()
    for (const url of list) {
      await preloadUrl(url)
    }
  }

  onMounted(() => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window && targetRef?.value) {
      observer = new IntersectionObserver((entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          isSectionVisible.value = true
          preloadAll()
          observer.disconnect()
        }
      }, options)

      observer.observe(targetRef.value)
    } else {
      isSectionVisible.value = true
      preloadAll()
    }
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
    // Clean up created blob URLs to prevent memory leaks
    createdBlobUrls.forEach((blobUrl) => {
      URL.revokeObjectURL(blobUrl)
    })
    createdBlobUrls.clear()
  })

  return {
    isSectionVisible,
    cachedUrls,
    getCachedSrc,
    preloadAll,
    preloadNext
  }
}
