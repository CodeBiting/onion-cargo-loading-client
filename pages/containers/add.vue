<template>
    <headerAndFooter title="Add Container">
        <div data-test='addNewContainer'>
            <form @submit.prevent="post">
                <div class="w-full">
                        <label for="code" data-test='codeLabel' class="text-xl pr-2">Code:</label>
                        <input data-test='code' id="code" v-model="formData.code" type="text" class="text-black placeholder-gray-600 w-100 px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-md bg-gray-200  focus:border-gray-700 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">
                    </div>
                    <div class="w-full">
                        <label for="description" data-test='descriptionLabel' class="text-xl pr-2">Description:</label>
                        <input data-test='description' id="description" v-model="formData.description" type="text" class="text-black placeholder-gray-600 w-100 px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-md bg-gray-200  focus:border-gray-700 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"> 
                    </div>
                    <label class="text-xl">Dimensions:</label>
                    <div class="w-full pl-5">
                        <div class="w-full">
                            <label for="width" data-test='widthLabel' class="text-xl pr-2">Width:</label>
                            <input data-test='width' id="width" v-model="formData.width" type="number" class="text-black placeholder-gray-600 w-100 px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-md bg-gray-200  focus:border-gray-700 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"> 
                        </div>
                        <div class="w-full">
                            <label for="length" data-test='lengthLabel' class="text-xl pr-2">Length</label>
                            <input data-test='length' type="number" v-model="formData.length" name="" id="length" class="text-black placeholder-gray-600 w-100 px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-md bg-gray-200  focus:border-gray-700 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">
                        </div>
                        <div class="w-full">
                            <label for="height" data-test='heightLabel' class="text-xl pr-2">Height</label>
                            <input data-test='height' type="number" name="" v-model="formData.height" id="height" class="text-black placeholder-gray-600 w-100 px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-md bg-gray-200  focus:border-gray-700 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">
                        </div>
                        <div class="w-full">
                            <label for="maxWeight" data-test='maxWeightLabel' class="text-xl pr-2">Max. Weight:</label>
                            <input data-test='maxWeight' type="number" name="" v-model="formData.maxWeight" id="maxWeight" class="text-black placeholder-gray-600 w-70 px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-md bg-gray-200  focus:border-gray-700 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">
                        </div>
                    </div>
                    <button type="submit" data-test='submitNewContainer' class="py-2 bg-gray-700 text-white px-5 rounded-md mt-6 w-2/6 hover:bg-gray-500">Submit</button>
            </form>
        </div>
    </headerAndFooter>
    <alerts :data-test='status' :intent="status" :show="showAlert" :on-dismiss="() => showAlert=false" :title="title">
    </alerts>
</template>

<script setup>
    import { ref } from 'vue';
    import headerAndFooter from '~/components/headerAndFooter.vue';
    import alerts from '~/components/alerts.vue';
    const clientData = useCookie('clientData');
    const showAlert=ref(false);
    const title=ref('');
    const status=ref('success');
    const formData = ref({
        code: '',
        description: '',
        width: 0,
        length: 0,
        height: 0,
        maxWeight: 0
    });
    const post= async () => {
        const { data: responseData } = await useFetch('http://localhost:8080/v1/container',{
           /* headers: {
            "Content-Type": "application/json",
            },*/
            method: 'POST',
            body: {
                clientId: clientData.value.id,
                code: formData.value.code,
                description: formData.value.description,
                width: formData.value.width,
                length: formData.value.length,
                height: formData.value.height,
                maxWeight: formData.value.maxWeight,
            }
        });
        if(responseData._value){
            status.value='success';
            title.value='Container created';
            showAlert.value=true;
        }else{
            status.value='danger';
            title.value='Check if the code already exists';
            showAlert.value=true;
        }
    }
</script>

<style lang="scss" scoped>

</style>