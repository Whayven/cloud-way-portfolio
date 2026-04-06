"use client"

import { useActionState } from "react"
import { login, type LoginState } from "@/app/actions/auth"
import { AuthLayout } from "@/app/_components/catalyst/auth-layout"
import { Heading } from "@/app/_components/catalyst/heading"
import { Text } from "@/app/_components/catalyst/text"
import { Field, Label } from "@/app/_components/catalyst/fieldset"
import { Input } from "@/app/_components/catalyst/input"
import { Button } from "@/app/_components/catalyst/button"

const initialState: LoginState = {}

export default function UnauthorizedPage() {
  const [state, action, pending] = useActionState(login, initialState)

  return (
    <AuthLayout>
      <div className="w-full max-w-sm">
        <Heading>Admin Login</Heading>
        <Text className="mt-2">
          Enter your password to access the admin panel.
        </Text>
        <form action={action} className="mt-8 space-y-6">
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              autoComplete="current-password"
              autoFocus
              required
            />
          </Field>
          {state.error && (
            <Text className="!text-red-500 text-sm">{state.error}</Text>
          )}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </AuthLayout>
  )
}
