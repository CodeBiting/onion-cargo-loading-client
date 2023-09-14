<template>
    <div>
        <h2>Container {{ id }}</h2>
        <ul>
            <li>Code: {{ containerData.code }}</li>
            <li>Description: {{ containerData.description }}</li>
            <li>
                Dimensions: 
                <ul>
                    <li>Width: {{ containerData.width }}</li>
                    <li>Length: {{ containerData.length }}</li>
                    <li>Height: {{ containerData.height }}</li>
                    <li>Max. Weight: {{ containerData.maxWeight }}</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script setup>
    const { id } = useRoute().params;
    let containerData = await useFetch(`http://localhost:8080/v1/container/${id}`);
    containerData = containerData.data._value.data;
</script>

<style scoped>

</style>