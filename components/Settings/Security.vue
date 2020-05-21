<template>
  <div class="form__inputs">
    <MyInput
      v-model="currentPassword"
      :rightIcon="false"
      :leftIcon="false"
      name="currentPassword"
      label="Current Password"
      type="text"
      class="form__input"
    />
    <MyInput
      v-model="newPassword"
      :rightIcon="false"
      :leftIcon="false"
      name="newPassword"
      label="New Password"
      type="text"
      class="form__input"
    />
    <MyInput
      v-model="confirmPassword"
      :rightIcon="false"
      :leftIcon="false"
      name="confirmPassword"
      label="Confirm Password"
      type="text"
      class="form__input form__input_w100"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  }
}
</script>
