<template>
  <div>
    <page-component :title="title">
      Content goes here
    </page-component>
  </div>
</template>

<script>
import PageComponent from '../components/PageComponent.vue'
export default {
  components: { PageComponent },
    data() {
      return {
        title: "Surveys",
      }
    },
}
</script>
