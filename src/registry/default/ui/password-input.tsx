"use client"

import * as React from "react"
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group"
import { useMergedRefs } from "./internal"

export type PasswordInputProps = Omit<
  React.ComponentProps<typeof InputGroupInput>,
  "type"
> & {
  defaultVisible?: boolean
}

const PasswordInput = ({
  ref,
  defaultVisible = false,
  spellCheck = false,
  autoCapitalize = "off",
  autoComplete = "current-password",
  ...props
}: PasswordInputProps) => {
  const [visible, setVisible] = React.useState(defaultVisible)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const inputRefs = useMergedRefs(inputRef, ref)

  return (
    <InputGroup>
      <InputGroupInput
        {...props}
        ref={inputRefs}
        type={visible ? "text" : "password"}
        spellCheck={spellCheck}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
      />

      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          title={visible ? "Hide password" : "Show password"}
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={(e) => {
            const input = inputRef.current!
            const cursorRange = [input?.selectionStart, input?.selectionEnd]

            e.preventDefault()
            setVisible((prev) => !prev)

            requestAnimationFrame(() => {
              input?.focus()
              if (cursorRange[0] !== null || cursorRange[1] !== null) {
                input?.setSelectionRange(cursorRange[0], cursorRange[1])
              }
            })
          }}
        >
          {visible ? (
            <EyeSlashIcon className="size-4" />
          ) : (
            <EyeIcon className="size-4" />
          )}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export { PasswordInput }
