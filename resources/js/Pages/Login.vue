<template>
  <form @submit.prevent="submit">
    <div>
      <x-jet-label for="email" value="Email" />
      <x-jet-input
        id="email"
        class="block mt-1 w-full"
        type="email"
        name="email"
        :value="old('email')"
        required
        autofocus
      />
    </div>

    <div class="mt-4">
      <x-jet-label for="password" value="Password" />
      <x-jet-input
        id="password"
        class="block mt-1 w-full"
        type="password"
        name="password"
        required
        autocomplete="current-password"
      />
    </div>

    <div class="block mt-4">
      <label for="remember_me" class="flex items-center">
        <input
          id="remember_me"
          type="checkbox"
          class="form-checkbox"
          name="remember"
        />
        <span class="ml-2 text-sm text-gray-600">Remember me</span>
      </label>
    </div>

    <div class="flex items-center justify-end mt-4">
      <inertia-link
        class="underline text-sm text-gray-600 hover:text-gray-900"
        :href="$route('password.request')"
      >
        Forgot your password?
      </inertia-link>

      <x-jet-button class="ml-4"> Login </x-jet-button>
    </div>
  </form>
</template>
<script>
export default {
  methods: {
    submit() {
      this.$inertia.post('/login', this.form)
    },
  },
}
</script>
