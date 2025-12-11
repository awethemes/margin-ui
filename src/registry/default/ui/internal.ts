"use client"

import * as React from "react"

// Re-export focus utilities from react-aria
export * from "@react-aria/focus"
export * from "@radix-ui/react-slot"
export * from "@radix-ui/react-use-controllable-state"

export type forwardRefType = typeof forwardRef

// Override forwardRef types so generics work.
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-object-type
declare function forwardRef<T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
): (props: P & React.RefAttributes<T>) => React.ReactElement | null

type PossibleRef<T> = React.Ref<T> | undefined

/**
 * Combine multiple refs into a single ref. This use useful when you have two
 * refs from both `React.forwardRef` and `useRef` that you would like to add to
 * the same node.
 */
export const useMergedRefs = <T>(
  ...refs: PossibleRef<T>[]
): React.RefCallback<T> => {
  return React.useCallback((node) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node)
      } else if (ref !== null && ref !== undefined) {
        ref.current = node
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs)
}

/**
 * Provide a stable reference for a callback that is passed as a prop to a
 * component. This is helpful when you want access to the latest version of a
 * callback prop but don't want it to be added to the dependency array of an
 * effect.
 */
export function useCallbackRef<T extends (...args: never[]) => unknown>(
  callback?: T | undefined
): T {
  const callbackRef = React.useRef(callback)

  React.useEffect(() => {
    callbackRef.current = callback
  })

  // https://github.com/facebook/react/issues/19240
  return React.useMemo(
    () => ((...args) => callbackRef.current?.(...args)) as T,
    []
  )
}

/**
 * A hook that returns a boolean indicating whether the current
 * viewport matches the given media query.
 */
export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(
    () => window.matchMedia(query).matches
  )

  React.useEffect(() => {
    const onChange = (event: MediaQueryListEvent) => {
      setValue(event.matches)
    }

    const result = window.matchMedia(query)
    result.addEventListener("change", onChange)
    setValue(result.matches)

    return () => result.removeEventListener("change", onChange)
  }, [query])

  return value
}

/**
 * Tiny hook to force a re-render of a component.
 */
export function useForceUpdate() {
  const [, rerender] = React.useState({})

  return React.useCallback(() => rerender({}), [])
}
