<template>
    <h2 class="is-size-1 has-text-centered mb-5">Projetos</h2>
    <div class="projetos">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Projetos',

})
</script>


<style scoped>
.projetos {
    padding: 1rem;
}

h2 {
    color: var(--title-color);
}
</style>
