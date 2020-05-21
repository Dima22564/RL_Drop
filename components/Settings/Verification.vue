<template>
  <div class="form__inputs">
    <MyInput
      v-model="address"
      :rightIcon="false"
      :leftIcon="false"
      name="address"
      label="Address"
      type="text"
      class="form__input form__input_w100"
    />
    <MyInput
      v-model="code"
      :rightIcon="false"
      :leftIcon="false"
      name="code"
      label="Code"
      type="text"
      class="form__input form__input_w100"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      address: '',
      code: ''
    }
  }
}
</script>
