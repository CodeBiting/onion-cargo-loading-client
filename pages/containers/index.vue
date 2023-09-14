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
                <div>
                    <li></li>
                </div>
            </ul>
            <form>
                <label for="products">Select a file:</label>
                <input type="file" id="products" name="products" accept=".csv">
                <br>
                <button>Import</button>
            </form>
        </section>
        <br>
        <button onclick="">Search</button>
    </div>
</template>

<script setup>
    let allContainer = await useFetch('http://localhost:8080/v1/container')
    allContainer = allContainer.data._value.data;
    console.log(allContainer);
    const fileInputRef = ref(null);

    function readCSVFile(){
        var files = document.querySelector('#products').files;

        if(files.length > 0 ){

            // Selected file
            var file = files[0];

            // FileReader Object
            var reader = new FileReader();

            // Read file as string 
            reader.readAsText(file);

            // Load event
            reader.onload = function(event) {

                // Read file data
                var csvdata = event.target.result;

                // Split by line break to gets rows Array
                var rowData = csvdata.split('\n');

                // <table > <tbody>
                var tbodyEl = document.getElementById('tblcsvdata').getElementsByTagName('tbody')[0];
                tbodyEl.innerHTML = "";

                // Loop on the row Array (change row=0 if you also want to read 1st row)
                for (var row = 1; row < rowData.length; row++) {
                    // Insert a row at the end of table
                    var newRow = tbodyEl.insertRow();
                    // Split by comma (,) to get column Array
                    rowColData = rowData[row].split(',');
                    // Loop on the row column Array
                    for (var col = 0; col < rowColData.length; col++) {
                        // Insert a cell at the end of the row
                        var newCell = newRow.insertCell();
                        newCell.innerHTML = rowColData[col];
                    }
                }
            };

        }else{
            alert("Please select a file.");
        }
    }
</script>
<style scoped>

</style>