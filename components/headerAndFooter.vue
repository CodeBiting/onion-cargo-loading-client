<template>
    <!--H1 and Nav-->
    <div class="min-h-full">
        <Disclosure as="nav" class="bg-gray-800">
            <div class="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <img class="h-12 w-12" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                        </div>
                        <h1 class="text-3xl font-bold tracking-tight text-gray-100 ml-2">Cargo-Loading</h1>
                        <div class="ml-9 flex items-baseline space-x-2">
                            <NuxtLink v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-lg font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </Disclosure>
        <!--Title-->
        <div class="bg-white shadow">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h2 class="text-4xl font-bold tracking-tight text-gray-900">{{ title }}</h2>
            </div>
        </div>
        <!--Content-->
        <main class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 shadow rounded-md">
                <div class="sm:flex sm:items-start">
                    <div class="mt-2 sm:ml-4 box-border w-full sm:mt-0 sm:text-left">
                        <slot/>
                    </div>
                </div>
            </div>
        </main>
        <!--Footer-->
        <Disclosure as="footer" class="bg-gray-800" v-slot="{ open }">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="flex h-16 items-center justify-between">
                        <div class="flex items-center mx-auto">
                            <div class="flex-shrink-0">
                                <img class="h-12 w-12" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                            </div>
                            <h1 class="text-2xl font-bold tracking-tight text-gray-100 ml-2">CodeBiting&copy;</h1>
                        </div>
                    </div>
                </div>
        </Disclosure>
    </div>
</template>
<script setup>
    import { Disclosure } from '@headlessui/vue';
    const props = defineProps({
        title: String,
        home: {
            type: Boolean,
            default: false,
        },
        containers: {
            type: Boolean,
            default: false,
        },
    });
    let navigation = [
        {name: 'Home', href: '/', current: props.home},
        {name: 'Containers', href: '/containers', current: props.containers},
    ];
</script>
<style>

</style>