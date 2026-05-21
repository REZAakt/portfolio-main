export function useSwipeDirection() {
  return useState<'left' | 'right' | null>('swipe-direction', () => null)
}
