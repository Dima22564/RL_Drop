<template>
  <div class="form__inputs">
    <MyInput
      v-model="link1"
      :rightIcon="false"
      :leftIcon="true"
      name="link1"
      label="Link 1"
      type="text"
      class="form__input"
    >
      <template slot="leftIcon">
        <SteamIcon />
      </template>
    </MyInput>
    <MyInput
      v-model="link2"
      :rightIcon="false"
      :leftIcon="true"
      name="link2"
      label="Link 2"
      type="text"
      class="form__input"
    >
      <template slot="leftIcon">
        <SteamIcon />
      </template>
    </MyInput>
    <MyInput
      v-model="link3"
      :rightIcon="false"
      :leftIcon="true"
      name="link3"
      label="Link 3"
      type="text"
      class="form__input"
    >
      <template slot="leftIcon">
        <SteamIcon />
      </template>
    </MyInput>
    <MyInput
      v-model="link4"
      :rightIcon="false"
      :leftIcon="true"
      name="link4"
      label="Link 4"
      type="text"
      class="form__input"
    >
      <template slot="leftIcon">
        <SteamIcon />
      </template>
    </MyInput>
    <MyInput
      v-model="link5"
      :rightIcon="false"
      :leftIcon="true"
      name="link5"
      label="Link 5"
      type="text"
      class="form__input form__input_w100"
    >
      <template slot="leftIcon">
        <SteamIcon />
      </template>
    </MyInput>
  </div>
</template>

<script>
import SteamIcon from 'vue-material-design-icons/Steam.vue'
export default {
  components: {
    SteamIcon
  },
  data () {
    return {
      link1: '',
      link2: '',
      link3: '',
      link4: '',
      link5: ''
    }
  }
}
</script>
