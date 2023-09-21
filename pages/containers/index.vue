<template>
    <headerAndFooter title="Containers" containers=true>
        <div class="flex gap-5">
            <!--Containers-->
            <section class="flex-auto w-1/2 border-2 border-gray-200 rounded-md shadow-md">
                <div class="bg-gray-200 px-2 py-1 text-3xl">
                    <div class="flex m-auto">
                        <div class="flex-auto w-full">
                            <h3>Your Containers</h3>
                        </div>
                        <div class="flex-auto">
                            <NuxtLink href="/containers/add" class="text-right w-full inline-block"><PlusIcon class="text-green-500 h-8 w-8 transition-all duration-500 hover:h-9 w-9" /></NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div v-for="container in allContainer" class=" max-w-md w-full mx-auto rounded-2xl bg-white py-2">
                        <acordeon :name="container.code">
                            <div>
                                <div class="float-right">
                                    <Disclosure v-slot="{ open }" as="div" class="w-full">
                                        <DisclosureButton>
                                            <Bars2Icon :class="open ? 'text-gray-500 h-9 w-9' : ''" class="h-8 w-8 text-gray-700 transition-all duration-500 hover:text-gray-500 hover:h-9 w-9"/>
                                        </DisclosureButton>
                                        <DisclosurePanel :class="open ? 'border-2 border-gray-700 shadow-md' : ''" class="w-20 py-2 text-center absolute text-sm rounded-md bg-gray-600">
                                            <button><NuxtLink class="text-white" :href="'/containers/edit/'+container.id"><PencilSquareIcon class="px-1 h-9 w-9 text-orange-300"/></NuxtLink></button>
                                            <button class="text-white"><XMarkIcon class="px-1 h-10 w-10 text-red-500"/></button>
                                        </DisclosurePanel>
                                    </Disclosure>
                                </div>
                                <div class="text-lg">
                                    <ul>
                                        <li>- Description: {{ container.description }}</li>
                                        <li>- Characteristics:</li>
                                        <ul class="pl-3">
                                            <li>- Width: {{ container.width }}</li>
                                            <li>- Length: {{ container.length }}</li>
                                            <li>- Height: {{ container.height }}</li>
                                            <li>- Max. Weight: {{ container.maxWeight }}</li>
                                        </ul>
                                    </ul>
                                </div>
                            </div>
                        </acordeon>
                    </div>
                </div>
            </section>
            <!--Products-->
            <section class="flex-auto w-1/2">
                <div>
                    <h3>Products</h3>
                    <label for="products">Select a file:</label>
                    <input type="file" id="products" name="products" accept=".csv" @change="handleFileUpload">    
                </div>
                <div v-for="(product, index) in allProducts" :key="index" class="mx-auto max-w-md rounded-2xl bg-white py-2">
                    <acordeon :name="product.code">
                        <p>- Characteristics:</p>
                        <ul>
                            <li>Width: {{ product.x }}</li>
                            <li>Length: {{ product.y }}</li>
                            <li>Height: {{ product.z }}</li>
                            <li>Volume: {{ product.volume }}</li>
                        </ul>
                    </acordeon>
                </div>
                <!--<button @click="readCSVFile()">Import</button>-->
            </section>
        </div>
        <br>
        <button onclick="" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium m-auto w-full">Find Smallest</button>
    </headerAndFooter>
</template>

<script setup> 
    import headerAndFooter from '~/components/headerAndFooter.vue';
    import acordeon from '~/components/acordeon.vue'
    import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
    import { Bars2Icon, PencilSquareIcon, XMarkIcon, PlusIcon } from '@heroicons/vue/24/solid'
    let allContainer = await useFetch('http://localhost:8080/v1/container');
    allContainer = allContainer.data._value.data;
    let allProducts = ref([]);
    function csvToObj(csvData) {
        const lines = csvData.split('\n');
        const headers = lines[0].split(',');
        const products= [];
        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            let values = lines[i].split(',');
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = values[j];
            }
            products.push(obj);
        }
        allProducts.value=products;
    }
    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
                reader.onload = () => {
                const csvData = reader.result;
                csvToObj(csvData);
            };
            reader.readAsText(file);
        }
    }
</script>
<style scoped>

</style>