<template>
  <div class="form__inputs">
    <MyInput
      v-model="link1"
      :rightIcon="false"
      :leftIcon="true"
      name="link1"
      label="Steam Link"
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
      label="Nickname Xbox"
      type="text"
      class="form__input"
    >
      <template slot="leftIcon">
        <PlaystationIcon />
      </template>
    </MyInput>
    <MyInput
      v-model="link3"
      :rightIcon="false"
      :leftIcon="true"
      name="link3"
      label="Nickname PS4"
      type="text"
      class="form__input"
    >
      <template slot="leftIcon">
        <XboxIcon />
      </template>
    </MyInput>
  </div>
</template>

<script>
import SteamIcon from 'vue-material-design-icons/Steam.vue'
import PlaystationIcon from 'vue-material-design-icons/SonyPlaystation.vue'
import XboxIcon from 'vue-material-design-icons/MicrosoftXbox.vue'
export default {
  components: {
    SteamIcon,
    PlaystationIcon,
    XboxIcon
  },
  data () {
    return {
      link1: '',
      link2: '',
      link3: ''
    }
  }
}
</script>
