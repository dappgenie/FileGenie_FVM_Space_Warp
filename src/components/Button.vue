<script lang="ts" setup>
    interface IButtonProps {
        color?: 'base' | 'primary' | 'warning' | 'success'
        iconPosition?: 'left' | 'right'
        rounded?: 'sm' | 'lg' | 'xl' | '2xl' | 'full'
    }
    defineProps<IButtonProps>()
</script>

<template>

<button class="button-style" :class="[color ? `btn-${color}` : 'btn-base', rounded ? `rounded-${rounded}` : 'rounded-lg']">
    <div v-if="iconPosition === 'left'" class="mr-2">
      <slot name="icon" />
    </div>
    <slot name="content">Click</slot>
    <div v-if="iconPosition === 'right'" class="ml-2">
      <slot name="icon" />
    </div>
</button>
</template>

<style scoped lang="css">
    .btn-icon {
        @apply w-3 h-3;
    }
    .button-style {
        @apply btn flex justify-center items-center shadow-btn dark:shadow-btn-dark hover:shadow-btn-hover dark:hover:shadow-btn-dark-hover;
    }
    .btn-base {
        @apply background-secondary hover:bg-[#DDE7FC]/40 hover:dark:bg-[#1C2434]/40 text-color-primary;
    }
    .btn-primary {
        @apply bg-primary dark:bg-secondary hover:bg-primary/80 dark:hover:bg-secondary/80 text-white;
    }
    .btn-warning {
        @apply bg-red-700 dark:bg-red-900 hover:bg-red-600 dark:hover:bg-red-800 text-white;
    }
    .btn-success {
        @apply bg-green-700 dark:bg-green-800 hover:bg-green-600 dark:hover:bg-green-700 text-white;
    }
</style>
