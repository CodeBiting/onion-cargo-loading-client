<template>
    <div>
        <h2>Titol?</h2>
        <!--Containers-->
        <section>
            <h3>Containers</h3>
            <button onclick="">+</button>
            <ul>
                <div v-for="container in allContainer">
                    <li>
                        <NuxtLink :to="`/containers/${container.id}`">{{ container.code }}</NuxtLink>
                        <button onclick=""><img src="/angle-right-solid.svg" alt="More options"></button>
                    </li>
                </div>
            </ul>
        </section>
        <!--Products-->
        <section>
            <h3>Products</h3>
            <ul>
                <div v-for="(product, index) in allProducts" :key="index">
                    <li>
                        <p>{{ product.code }}</p>
                    </li>
                </div>
            </ul>
            <label for="products">Select a file:</label>
            <input type="file" id="products" name="products" accept=".csv" @change="handleFileUpload">
            <!--<button @click="readCSVFile()">Import</button>-->
        </section>
        <br>
        <button onclick="">Search</button>
    </div>
</template>

<script setup> 
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