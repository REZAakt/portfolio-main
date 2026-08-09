type SmartContactLink = {
  appTo?: string
  fallbackTo?: string
  to?: string
}

function isMobileBrowser() {
  if (!import.meta.client) {
    return false
  }

  return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function useSmartContactLink() {
  function openSmartContactLink(event: MouseEvent, link?: SmartContactLink) {
    if (!import.meta.client || !link?.appTo || !isMobileBrowser()) {
      return
    }

    const fallbackTo = link.fallbackTo || link.to

    if (!fallbackTo) {
      return
    }

    event.preventDefault()

    let pageWasHidden = false

    const markHidden = () => {
      pageWasHidden = document.hidden
    }

    document.addEventListener('visibilitychange', markHidden, { once: true })

    window.setTimeout(() => {
      document.removeEventListener('visibilitychange', markHidden)

      if (!pageWasHidden) {
        window.location.href = fallbackTo
      }
    }, 900)

    window.location.href = link.appTo
  }

  return {
    openSmartContactLink
  }
}
