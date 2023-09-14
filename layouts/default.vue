<template>
    <div>
        <header>
            <h1>Cargo-Loading</h1>
            <nav>
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/containers">Containers</NuxtLink></li>
                </ul>
            </nav>
        </header>
        <!--thats the content form the page-->
        <div>
            <slot/>
        </div>
        <footer>
            <p>CodeBiting&copy;</p>
        </footer>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>