<script setup>
import { ref, onMounted, reactive } from 'vue'
import { boolean, string } from 'yup'
const props = defineProps({
  lockedTab: Array[string]
})
// const props = defineProps(locked?: boolean)
const readstatus = ref([
  {
    value: 'Read',
    status: false
  },
  {
    value: 'Write',
    status: false
  }
])
const selectedCheck = ref([])
let tabContainer = ref(null)
let tabHeaders = ref(null)
let tabs = ref(null)
let activeTabIndex = $ref(0)
let read = $ref(false)
let write = $ref(false)

onMounted(() => {
  tabs.value = [...tabContainer.value.querySelectorAll('.tab')]
  for (let x of tabs.value) {
    if (x.classList.contains('active')) {
      activeTabIndex = tabs.value.indexOf(x)
    }
  }
})
const changeTab = (index) => {
  activeTabIndex = index
  for (let x of [...tabs.value, ...tabHeaders.value]) {
    x.classList.remove('active')
  }
  tabs.value[activeTabIndex].classList.add('active')
  tabHeaders.value[activeTabIndex].classList.add('active')
}
</script>

<template>
  <div :class="customClass" ref="tabContainer">
    <div class="tab-container">
      <ul class="tab-list relative">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          @click="changeTab(index)"
          ref="tabHeaders"
          class="cursor-pointer"
        >
          <div
            aria-current="page"
            class="tab-content"
            :class="activeTabIndex == index ? 'selected ' : 'tab_bg'"
          >
            <AAvatar
              :icon="tab.slot"
              class="rounded-lg bg-transparent mr-2"
              :class="
                activeTabIndex == index
                  ? 'text-white text-base'
                  : 'text-[#697BA1] text-xl'
              "
            />
            <p :class="activeTabIndex == index ? '' : 'hidden lg:block'">
              {{ tab.title }}
            </p>
            <AAvatar
              v-if="lockedTab.includes(tab.title)"
              icon="i-mdi-lock"
              class="rounded-lg text-xs bg-transparent ml-1"
              :class="
                activeTabIndex == index
                  ? 'text-white text-base'
                  : 'text-[#697BA1] text-xl'
              "
            />
          </div>
        </li>
        <li
          class="ml-auto mb-2 hidden lg:block"
          v-if="
            tabs &&
            (tabs[activeTabIndex].title == 'Manage' ||
              tabs[activeTabIndex].title == 'Manage Contract')
          "
        >
          <Dropdown
            v-model="selectedCheck"
            id="deployed-dropdown"
            name="deployed-dropdown"
            :options="readstatus"
            :get-label="(option) => option.value"
            :get-value="(option) => option.value"
            :inputType="'button'"
            :multi="true"
            :multi-check="true"
          >
          </Dropdown>
        </li>
      </ul>
      <div
        class="w-full block lg:hidden flex justify-end"
        v-if="tabs && tabs[activeTabIndex].title == 'Manage'"
      >
        <Dropdown
          id="deployed-dropdown"
          :close-on-select="false"
          name="deployed-dropdown"
        >
          <template #default>
            <Button class="btnn">
              <template #content>
                <div class="flex justify-center items-center">
                  Read
                  <!-- {{tabs.value[activeTabIndex]}} -->
                  <AAvatar
                    icon="i-bx-bxs-down-arrow"
                    color="success"
                    class="text-primary dark:text-secondary p-0 m-0 text-sm"
                  />
                </div>
              </template>
            </Button>
          </template>
          <template #content>
            <div
              id="file-management-dropdown-sort-content"
              name="file-management-dropdown-sort-content"
              class="space-y-1 text-xs"
            >
              <div v-bind="attributes" class="dropdown-item dropdown-item-text">
                <FormCheckbox
                  class="font-xs"
                  :value="readstatus.Read"
                  @update:model-value="readstatus.Read = !readstatus.Read"
                >
                  <template #title>
                    Read
                  </template>
                </FormCheckbox>
              </div>
              <div v-bind="attributes" class="dropdown-item dropdown-item-text">
                <FormCheckbox
                  class="font-xs"
                  :value="readstatus.Write"
                  @update:model-value="readstatus.Write = !readstatus.Write"
                >
                  <template #title>
                    Write
                  </template>
                </FormCheckbox>
              </div>
            </div>
          </template>
        </Dropdown>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="css">
.uno-layer-base-text-2xl {
  @apply h-auto w-auto;
}
.uno-layer-base-rounded-full {
  border-radius: 0px;
}
.readCss {
  @apply py-.5 px-4;
}
.selected {
  @apply bg-primary text-white shadow-btn dark:bg-[#2E3C56] dark:shadow-btn-dark;
  box-shadow: -1px -1px 0px #ffffff, -2px -3px 7px #ffffff,
    3px 2px 5px rgba(60, 60, 60, 0.25), 3px 3px 4px #cad7f3, 0px 0px 5px #cad7f3;
}
.tab_bg {
  @apply bg-transparent text-[#697BA1];
}
.tab-container {
  @apply px-4 py-5 md:px-14 lg:py-10  w-full h-auto;
}
.tab-list {
  @apply justify-between lg:justify-start flex flex-wrap text-sm font-medium text-center w-full border-b border-[#808592] items-end mb-4;
}
.tab-content {
  @apply inline-block lg:py-2.5 px-4 pt-3 pb-2 lg:pt-3 lg:pb-1.5 lg:px-5 text-xs lg:text-base  rounded-t-3xl flex justify-center items-center active;
}

#tab-headers ul li.active {
  color: #008438;
  font-weight: bold;
}

#tab-headers ul li.active:after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  width: 100%;
  background: #008438;
}
#active-tab,
#tab-headers {
  width: 100%;
}

#active-tab {
  padding: 0.75rem;
}
</style>
