<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { onClickOutside, useWindowScroll } from '@vueuse/core'

interface IDropdownProps {
  closeOnSelect?: boolean
  contentClass?: HTMLAttributes['class']
  position?: 'right' | 'left' | 'center'
  parentClass?: string
  disabled?: boolean
  omitMinWidth?: boolean
}
const props = defineProps<IDropdownProps>()
const { closeOnSelect = true } = props

// open state
const isOpen = ref<boolean>(false)
const actions = {
  open() {
    isOpen.value = true
  },
  close() {
    isOpen.value = false
  },
  toggle() {
    isOpen.value = !isOpen.value
  },
}

// container
const dropdown = ref<HTMLDivElement | null>(null)
const content = ref<HTMLDivElement | null>(null)

onClickOutside(
  content,
  (event) => {
    // check if clicked inside the content
    if (content.value && !closeOnSelect) {
      if (content.value.contains(event.target as Node)) {

      }
      else {
        isOpen.value = false
      }
    }
    else {
      isOpen.value = false
    }
  },
)

onClickOutside(
  dropdown,
  (event) => {
    if (closeOnSelect) isOpen.value = false
  },
)

/* -------------------------------------------------------------------------- */
/*                                   TRIGGER                                  */
/* -------------------------------------------------------------------------- */
const onClick = (event: MouseEvent) => {
  if (!props.disabled) {
    event.preventDefault()
    event.stopPropagation()
    isOpen.value = !isOpen.value
  }
}
const events = {
  click: onClick,
}

const { y: windowY } = useWindowScroll()
const dropStyle = computed(() => {
  const el = dropdown.value
  const contentEl = content.value
  if (el && contentEl) {
    const boundbox = el.getBoundingClientRect()
    const { bottom, width, top, height } = boundbox
    const { height: contentHeight } = contentEl.getBoundingClientRect()
    const data = contentEl.offsetWidth
    // style
    const style: any = (props.omitMinWidth) ? {} : { 'min-width': `${width}px` }
    // if top is greater than half of the window height, then show the dropdown on top
    if (bottom + contentHeight > window.innerHeight)
      style.bottom = `${window.innerHeight - top}px`

    else
      style.top = `${windowY.value + height + 5}px`

    if (props.position === 'left') {
      style.left = '0'
    }
    else if (props.position === 'center') {
      style.left = `${(width / 2) - (data / 2)}px`
    }
    else {
      style.right = '0'
    }
    return style
  }
  else {
    return { left: 0, top: 0 }
  }
})
</script>

<template>
  <div ref="dropdown" :class="`flex relative ${parentClass ?? ''}`">
    <slot :events="events" :actions="actions" />
    <!-- <Teleport to="body"> -->
    <Transition :name="`bounce-${position ?? 'right'}`">
      <div v-if="isOpen" ref="content" :style="dropStyle" class="dropdown-content" :class="[contentClass]">
        <slot :actions="actions" :attributes="{ tabindex: 0 }" name="content" />
      </div>
    </Transition>
    <!-- </Teleport> -->
  </div>
</template>

<style lang="css" scoped>
/* -------------------------------------------------------------------------- */
/*                                 TRANSITIONS                                */
/* -------------------------------------------------------------------------- */
.dropdown-content {
  @apply absolute mt-1 z-50 rounded-lg w-max background-secondary overflow-hidden overflow-y-scroll shadow-xl;
}

.bounce-right-enter-active {
  animation: bounce-in 0.3s;
}

.bounce-right-leave-active {
  animation: bounce-in 0.3s reverse;
}

.bounce-left-enter-active {
  animation: bounce-in 0.3s;
  @apply origin-top-left;
}

.bounce-left-leave-active {
  animation: bounce-in 0.3s reverse;
  @apply origin-top-left;
}

.bounce-center-enter-active {
  animation: bounce-in 0.3s;
  @apply origin-top;
}

.bounce-center-leave-active {
  animation: bounce-in 0.3s reverse;
  @apply origin-top;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}
</style>
