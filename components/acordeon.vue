<template> 
    <Disclosure v-slot="{ open }" as="div" class="w-full">
        <DisclosureButton :class="open ? 'rounded-t-md' : 'rounded-md shadow-md', smallest?'bg-green-500 hover:bg-green-400':''" class="flex w-full justify-between bg-gray-600 px-5 py-2 text-left text-lg font-medium text-white transition-all duration-300 hover:bg-gray-500 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-65">
            <span>{{ name }}</span>
            <ChevronDownIcon :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5 text-white transition-all duration-300"/>
        </DisclosureButton>
        <DisclosurePanel :class="open ? 'border-2 border-gray-700 shadow-md' : '', smallest?'border-green-500':''" class="px-5 pt-4 w-full pb-1 text-sm text-gray-700 rounded-b-md transition-all duration-500">
          <slot/>  
        </DisclosurePanel>
    </Disclosure>
</template>

<script setup> 
    import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
    import { ChevronDownIcon } from '@heroicons/vue/24/solid'
    const props = defineProps({
        name: String,
        smallest: Boolean
    });
</script>
<style scoped>

</style>