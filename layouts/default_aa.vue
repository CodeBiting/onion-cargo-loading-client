<template>
    <!--
      This example requires updating your template:
  
      ```
      <html class="h-full bg-gray-100">
      <body class="h-full">
      ```
    -->
    <div class="min-h-full">
      <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img class="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
              </div>
              <h1 class="text-1xl font-bold tracking-tight text-gray-100 ml-2">Cargo-Loading</h1>
                <div class="ml-10 flex items-baseline space-x-4">
                  <NuxtLink v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</NuxtLink>
                </div>
            </div>
          </div>
        </div>
      </Disclosure>
    <!--Tittle-->
    <div class="bg-white shadow">
        <div class="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
    </div>
    <!--Content-->
    <main class="mx-auto max-w-5xl py-6 sm:px-6 lg:px-8">
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 shadow rounded-md">
            <div class="sm:flex sm:items-start pt-12 pb-12">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <slot/>
                </div>
            </div>
        </div>
    </main>

      <Disclosure as="footer" class="bg-gray-800" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <div class="flex items-center mx-auto">
              <div class="flex-shrink-0">
                <img class="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
              </div>
              <h1 class="text-1xl font-bold tracking-tight text-gray-100 ml-2">CodeBiting&copy;</h1>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  </template>
  
  <script>
  import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  //import { Bars3Icon, BellIcon, XMarkIcon } from '@vue-hero-icons/outline'
  const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Containers', href: '/containers', current: true },
  ]
  </script>