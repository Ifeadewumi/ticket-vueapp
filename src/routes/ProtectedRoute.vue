<template>
  <router-view v-if="sessionStore.session.user"></router-view>
  <div v-else>Redirecting...</div>
</template>

<script>
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'ProtectedRoute',
  props: {
    sessionStore: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()

    watchEffect(() => {
      if (!props.sessionStore.session.user) {
        router.replace({ path: '/auth/login', query: { from: router.currentRoute.value.fullPath } })
      } else if (props.sessionStore.session.user.expiresAt && new Date(props.sessionStore.session.user.expiresAt) < new Date()) {
        props.sessionStore.logout()
        router.replace({ path: '/auth/login', query: { from: router.currentRoute.value.fullPath, expired: true } })
      }
    })

    return {
      sessionStore: props.sessionStore,
    }
  }
}
</script>