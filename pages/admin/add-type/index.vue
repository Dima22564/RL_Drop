<template>
  <div>
    <b-form>
      <b-form-group
        label="Item type"
        label-for="name"
        description="Item Type"
      >
        <b-form-input
          id="name"
          type="text"
          required
          placeholder="Enter Item Type"
        ></b-form-input>
      </b-form-group>
    </b-form>

    <h5 class="admin__title">Types</h5>
    <b-list-group>
      <b-list-group-item>Cras justo odio</b-list-group-item>
      <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
      <b-list-group-item>Morbi leo risus</b-list-group-item>
      <b-list-group-item>Porta ac consectetur ac</b-list-group-item>
      <b-list-group-item>Vestibulum at eros</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  layout: 'admin'
}
</script>

<style lang="sass">
.admin
  &__title
    color: white
    margin-bottom: 10px
</style>
