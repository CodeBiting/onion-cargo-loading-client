<template>
    <headerAndFooter :title="'Edit Container '+id "> 
        <form action="">

        </form>
    </headerAndFooter>
</template>

<script setup>
    const { id } = useRoute().params;
    let containerData = await useFetch(`http://localhost:8080/v1/container/${id}`);
    containerData = containerData.data._value.data;
    /*useFetch('',{
        method: 'POST',
        body: formData})*/
</script>

<style scoped>

</style>