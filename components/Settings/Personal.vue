<template>
  <div class="form__inputs">
    <MyInput
      v-model="userName"
      :rightIcon="false"
      :leftIcon="false"
      name="userName"
      label="User Name"
      type="text"
      class="form__input"
    />
    <MyInput
      v-model="phoneNumber"
      :rightIcon="false"
      :leftIcon="false"
      name="phoneNumber"
      label="Phone Number"
      type="text"
      class="form__input"
    />
    <MyInput
      v-model="email"
      :rightIcon="false"
      :leftIcon="false"
      name="email"
      label="Email"
      type="text"
      class="form__input form__input_w100"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName: '',
      phoneNumber: '',
      email: ''
    }
  }
}
</script>
