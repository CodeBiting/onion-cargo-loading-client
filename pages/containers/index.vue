<template>
    <headerAndFooter title="Containers" containers=true data-test='headerFooter'>
        <div class="flex gap-5">
            <!--Containers-->
            <section class="flex-auto w-1/2 border-2 border-gray-200 rounded-md shadow-md">
                <div class="bg-gray-200 px-2 py-1 text-3xl">
                    <div class="flex m-auto">
                        <div class="flex-auto w-full"  data-test='yourContainers'>
                            <h3>Your Containers</h3>
                        </div>
                        <div class="flex-auto">
                            <NuxtLink href="/containers/add" data-test='addContainer' class="text-right w-full py-1"><PlusIcon class="text-green-500 h-8 w-8 transition-all duration-500 hover:h-9 w-9" /></NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="py-2" data-test='containers'>
                    <!--Popup Delete-->
                    <div v-for="container in allContainer" class=" max-w-md w-full mx-auto rounded-2xl bg-white py-2">
                        <acordeon :name="container.code" :data-test='container.code' :id="container.code" :smallest.sync=" container.code == smallestContainer? true:false">
                            <div>
                                <div class="float-right">
                                    <Disclosure v-slot="{ open }" :data-test='"btn"+container.code' as="div" class="w-full">
                                        <DisclosureButton>
                                            <Bars2Icon data-test='containerOptions' :class="open ? 'text-gray-500 h-9 w-9' : ''" class="h-8 w-8 text-gray-700 transition-all duration-500 hover:text-gray-500 hover:h-9 w-9"/>
                                        </DisclosureButton>
                                        <DisclosurePanel :class="open ? 'border-2 border-gray-700 shadow-md' : ''" class="w-20 py-2 text-center absolute text-sm rounded-md bg-gray-600">
                                            <button><NuxtLink data-test='modifyContainer' class="text-white" :href="'/containers/edit/'+container.id"><PencilSquareIcon class="px-1 h-9 w-9 text-orange-300"/></NuxtLink></button>
                                            <button data-test='deleteContainer' class="text-white" @click="togglePopup(container.id,container.code)"><XMarkIcon class="px-1 h-10 w-10 text-red-500"/></button>
                                        </DisclosurePanel>
                                    </Disclosure>
                                </div>
                                <div class="text-lg" data-test='containerData'>
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
                    <div v-if="popupTrigger" class="fixed z-50 w-full h-full">
                        <div data-test='deletePopUp' class="fixed top-0 bottom-0 left-0 right-0 z-30 flex justify-center items-center">
                            <div class="bg-gray-700 px-28 py-20 mx-auto text-center text-white rounded-md text-lg">
                                <p>Are you sure, you will delete the container "{{popupContCode}}"?</p>
                                <button data-test='deleteYes' @click="deleteContainer(popupTrigger)" class="px-4 py-3 mx-7 mt-7 bg-gray-600 rounded-md hover:bg-gray-400 transition-all duration-500">Yes</button>   
                                <button data-test='deleteNo' @click="togglePopup(false,false)" class="px-4 py-3 mx-7 mt-7 bg-gray-600 rounded-md hover:bg-gray-400 transition-all duration-500">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!--Products-->
            <section class="flex-auto w-1/2 border-2 border-gray-200 rounded-md shadow-md" data-test='products'>
                <div class="bg-gray-200 px-2 py-1 text-3xl">
                    <div class="flex m-auto">
                        <div class="flex-auto">
                            <h3>Products</h3>
                        </div>
                        <div class="text-3xl">
                            <label for="products" class="py-1" data-test='importProducts'><ArrowDownOnSquareIcon class="text-gray-800 cursor-pointer h-8 w-8 transition-all duration-300 hover:h-9 w-9" /></label>
                            <input data-test='importProductsFile' type="file" id="products" name="products" accept=".csv" @change="handleFileUpload" class="hidden">    
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div v-for="product in allProducts" class="mx-auto max-w-md rounded-2xl bg-white py-2">
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
                </div>
            </section>
        </div>
        <br>
        <button @click="findSmallest" data-test='findSmallest' class="bg-gray-700 text-white rounded-md px-3 py-2 text-lg transition-all duration-300 font-medium m-auto w-full hover:bg-gray-600">Find Smallest</button>
    </headerAndFooter>
    <alerts :intent="status" :data-test="status" :show="showAlert" :on-dismiss="() => showAlert=false" :title="title">
    </alerts>
</template>

<script setup> 
    import { ref } from 'vue';
    import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
    import { Bars2Icon, PencilSquareIcon, XMarkIcon, PlusIcon, ArrowDownOnSquareIcon } from '@heroicons/vue/24/solid'
    import headerAndFooter from '~/components/headerAndFooter.vue';
    import alerts from '~/components/alerts.vue';
    const showAlert=ref(false);
    const title=ref('');
    const status=ref('success');
    import acordeon from '~/components/acordeon.vue';
    let popupTrigger = ref(false);
    let popupContCode = ref('')
    const togglePopup = (containerId, containerCode) => {
        if (containerId) {
            popupTrigger.value = containerId;
            popupContCode.value= containerCode;
        } else popupTrigger.value = !popupTrigger.value;
    };
    const clientData = useCookie('clientData');
    if (!clientData.value) clientData.value={id:0};
    //const serverCookie= useCookie('serverData');
    let allContainer = await useFetch(`http://localhost:8080/v1/client/${clientData.value.id}/containers`);
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
    const deleteContainer= async (id) => {
        const { data: responseData } = await useFetch(`http://localhost:8080/v1/container/${id}`,{
            headers: {
                "Content-Type": "application/json",
            },
            method: 'DELETE'
        });
        if(responseData._value){
            status.value='success';
            title.value='Container deleted';
            showAlert.value=true;
            setTimeout(1000);
            location.reload();
        }else{
            status.value='danger';
            title.value='Something went wrong';
            showAlert.value=true;
        }
    }
    const smallestContainer = ref('');
    const findSmallest= async () => {
        const { data: responseData } = await useFetch(`http://localhost:8080/v1/container/smallest/${clientData.value.id}`,{
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: allProducts._rawValue
        });
        //console.log(responseData);
        if(responseData._rawValue){
            //responseData._rawValue.data.length==1
            smallestContainer.value= responseData._rawValue.data[0].code;
            //document.getElementById(responseData._rawValue.data[0].code);
            status.value='success';
            title.value=`The container you need is ${smallestContainer.value}`;
            showAlert.value=true;
        }else if(allProducts.value.length){
            console.log(allProducts);
            status.value='warning';
            title.value='Not found any product combination that can be fit into the boxes';
            showAlert.value=true;
        }else{
            console.log(allProducts);
            status.value='danger';
            title.value='No products imported';
            showAlert.value=true;
        }
    }
</script>
<style scoped>

</style>