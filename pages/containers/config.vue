<template>
    <headerAndFooter title="Configuration" data-test='headerFooter'>
        <h3 class="text-2xl font-semibold">Login</h3>
        <div class="px-3 py-2 text-lg">
            <div class="w-1/4">
                <div class="py-1 grid grid-cols-4 ">
                    <label for="clientCode" data-test='clientCodeLabel' class="">User</label>
                    <input data-test='clientCode' type="text" v-model="userData.clientCode" id="clientCode" class="col-span-3 border-2">
                </div>
                <div class="py-1 grid grid-cols-4 ">
                    <label for="token" data-test='tokenLabel'>Token</label>
                    <input data-test='token' type="text" v-model="userData.token" id="token" class="col-span-3 border-2">
                </div>
                <button data-test='logInClient' class="bg-gray-600 text-white px-2 py-1 rounded-md w-2/3" :onclick="getLogInClient">Apply</button>
            </div>
        </div>
        <h3 class="text-2xl font-semibold">Server</h3>
        <div class="px-3 py-2 text-lg">
            <div class="w-1/4">
                <div class="py-1 grid grid-cols-4 ">
                    <label for="serverUrl" class="">URL</label>
                    <input data-test='serverUrl' type="text" v-model="userData.serverUrl" id="serverUrl" class="col-span-3 border-2">
                </div>
                <button data-test='setServerUrl' class="bg-gray-600 text-white px-2 py-1 rounded-md w-2/3" :onclick="setServerUrl">Apply</button>
            </div>
        </div>
    </headerAndFooter>
    <alerts :intent="status" :data-test='status' :show="showAlert" :on-dismiss="() => showAlert=false" :title="title">
    </alerts>
</template>

<script setup>
    import { ref } from 'vue';
    import headerAndFooter from '~/components/headerAndFooter.vue';
    const clientCookie= useCookie(
        'clientData',
        {
            watch: true,
            sameSite: false
        }
    );
    if (!clientCookie.value) clientCookie.value={id:0,code:'',token:''};
    const serverCookie= useCookie('serverData');
    //TODO No implementat serverCookie per la url custom de l'api
    if(!serverCookie.value){
        serverCookie.value={url:'http://localhost:8080'}
    }
    import alerts from '~/components/alerts.vue';
    const showAlert=ref(false);
    const title=ref('');
    const status=ref('success');
    const userData = ref({
        clientCode: clientCookie.value.code ? clientCookie.value.code:'',
        token: clientCookie.value.token ? clientCookie.value.token:'',
        serverUrl: serverCookie.value.url
    });
    async function setServerUrl() {
        //TODO control d'errors a l'hora d'introduir la URL del servidor
        serverCookie.value.url = userData.serverUrl;
    }
    async function getLogInClient() {
        //${serverCookie.value.url}
        let client= await useFetch(`http://localhost:8080/v1/client?filter=code:like:${userData.value.clientCode},token:like:${userData.value.token}`);
        //console.log(JSON.stringify(client));
        //console.log(client.data._value.data[0].id);
        if (client.data._value.data.length==1) {
            clientCookie.value = { id: client.data._value.data[0].id, code: client.data._value.data[0].code, token: client.data._value.data[0].token};
            status.value='success';
            title.value='Logged In';
            showAlert.value=true;
        }else{
            clientCookie.value = { id: 0, code: '', token: ''};
            status.value='danger';
            title.value='No user with those credentials';
            showAlert.value=true;
        }
    }
</script>

<style scoped>

</style>