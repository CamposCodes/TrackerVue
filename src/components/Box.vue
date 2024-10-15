<template>
    <div class="box has-text-weight-bold">
        <slot></slot>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Box'
})
</script>


<style scoped>
div {
    box-shadow: none;
    background-color: var(--bg-tarefa);
    color: var(--text-color);
}
</style>
