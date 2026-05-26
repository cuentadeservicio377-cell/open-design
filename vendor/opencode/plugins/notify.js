export const NotificationPlugin = async ({ $ }) => {
  return {
    event: async ({ event }) => {
      if (event.type === "session.idle") {
        await $`osascript -e 'display notification "Response ready" with title "OpenCode"'`
      }

      if (event.type === "session.error") {
        await $`osascript -e 'display notification "Session error" with title "OpenCode"'`
      }
    },
  }
}
