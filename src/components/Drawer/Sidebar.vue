<script setup lang="ts">
import Logo from '../../assets/images/Logo.svg'
import Logo_text_light from '../../assets/images/Logo_text_light.svg'
import Logo_text_dark from '../../assets/images/Logo_text_dark.svg'
const { stepper, is_expanded } = $(storeToRefs(useStepperStore()))
const { toggleExpand } = useStepperStore()

const router = useRouter()
const route = (path: string, value: false | 'ERC20' | 'ERC721' | 'ERC1155', index: number) => {
  router.push(path)
  stepper.selected = value
  stepper.selectedIndex = index
}
</script>

<template>
  <aside class="sidebar w-72" :class="`${is_expanded ? 'md:w-64' : 'md:w-22'}`">
    <div class="logo">
      <img class="h-10 mr-2" :src="Logo" alt="logo_image">
      <img
        :class="[is_expanded ? 'md:opacity-100 visible' : 'md:opacity-0  md:hidden']"
        class="h-12 mt-2 opacity-100 duration-200 ease-in-out" :src="isDark ? Logo_text_dark : Logo_text_light" alt="logo_image"
      >
    </div>
    <div class="w-full">
      <div class="sidebar-item" :class="[(stepper.selectedIndex === 0) ? 'sidebar-item-selected' : 'bg-transparent']" @click="route('/dashboard', false, 0)">
        <div class="sidebar-content">
          <a class="sidebar-icon" i-mdi:view-dashboard />
          <span class="sidebar-text" :class="[is_expanded ? 'md:opacity-100 visible' : 'md:opacity-0 md:hidden']">Dashboard</span>
        </div>
      </div>
      <div class="sidebar-item" :class="[(stepper.selectedIndex === 1) ? 'sidebar-item-selected' : 'bg-transparent']" @click="route('/contracts', false, 1)">
        <div class="sidebar-content">
          <a class="sidebar-icon" i-mdi:file-document-edit />
          <span class="sidebar-text opacity-100" :class="[is_expanded ? 'md:opacity-100 visible' : 'md:opacity-0 md:hidden']">Ready Contracts</span>
        </div>
      </div>
      <!-- <div class="sidebar-item" :class="[(stepper.selectedIndex === 4) ? 'sidebar-item-selected' : 'bg-transparent']" @click="route('/projects', false, 4)">
        <div class="sidebar-content">
          <a class="sidebar-icon" i-mdi:folder-star-multiple />
          <span class="sidebar-text" :class="[is_expanded ? 'md:opacity-100 visible' : 'md:opacity-0 hidden']">Projects</span>
        </div>
      </div> -->
      <div class="sidebar-item" :class="[(stepper.selectedIndex === 2) ? 'sidebar-item-selected' : 'bg-transparent']" @click="route('/file-manager', false, 2)">
        <div class="sidebar-content">
          <a class="sidebar-icon" i-mdi:clipboard-file />
          <span class="sidebar-text" :class="[is_expanded ? 'md:opacity-100 visible' : 'md:opacity-0 md:hidden']">File Manager</span>
        </div>
      </div>
      <div class="sidebar-item" :class="[(stepper.selectedIndex === 3) ? 'sidebar-item-selected' : 'bg-transparent']" @click="route('/manage-contracts', false, 3)">
        <div class="sidebar-content">
          <a class="sidebar-icon" i-mdi:list-box />
          <span class="sidebar-text" :class="[is_expanded ? 'md:opacity-100 visible' : 'md:opacity-0 md:hidden']">Manage Contracts</span>
        </div>
      </div>
    </div>

    <div class="absolute top-20 -right-4 flex justify-end mb-4 ease-in-out rounded-full invisible md:visible" :class="`${is_expanded} ? '-top-10' : 'top-0'`">
      <button class="w-8 h-8 background hover:shadow-btn-hover dark:hover:shadow-btn-dark-hover rounded-full duration-500 ease-in-out" :class="[ isDark ? 'toggle-dark' : 'toggle-light' ,is_expanded ? 'rotate-0' : 'rotate-180']" @click="toggleExpand">
        <div m-auto i-carbon:chevron-left text-lg text-primary dark:text-secondary />
      </button>
    </div>
  </aside>
</template>

<style lang="css" scoped>
  .dropdown-animate {
    transition: height 300ms;
  }
  .sidebar {
    @apply z-50 relative flex flex-col nav-background text-color-secondary overflow-visible min-h-screen py-8 ;
    @apply shadow-btn dark:shadow-btn-dark duration-500 ease-in-out;
  }
  .logo {
    @apply ml-6 mb-12 h-12 flex justify-start items-center;
  }
  .sidebar-item {
    @apply w-full rounded-lg hover:bg-[#50596A]/10 dark:hover:bg-[#50596A]/30 hover:shadow-btn-hover dark:hover:shadow-btn-dark-hover hover:cursor-pointer;
  }
  .sidebar-item-selected {
    @apply bg-[#EAEAEA]/30 dark:bg-[#232C3D] shadow-btn-hover dark:shadow-btn-dark-hover;
  }
  .sidebar-content {
    @apply px-8 flex justify-start items-center no-underline py-4;
  }
  .sidebar-icon {
    @apply text-xl;
    background: linear-gradient(180deg, #9AA1A5 0%, #5E5E5E 100%);
  }
  .sidebar-dropdown {
    @apply text-lg absolute right-6 top-4 transition duration-300 shrink-0;
  }
  .sidebar-text {
    @apply text-sm ml-4 font-bold duration-200;
  }
  .toggle-light {
    filter: drop-shadow(-1px -1px 2px #CAD7F3) drop-shadow(1px 1px 2px rgba(202, 215, 243, 0.25));
  }
  .toggle-dark {
    filter: drop-shadow(-1px -1px 3px #283349) drop-shadow(1px 1px 3px #31353B);
  }
</style>

