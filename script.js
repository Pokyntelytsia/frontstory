window.onload = async function() {
    
    fetchData();
    
    async function fetchData() {
        const fechData = await fetch('https://jsonplaceholder.typicode.com/photos');
        if(fechData.ok) {
            const jsonData = await fechData.json();
            
            insertImages(jsonData.slice(0, 12));
        }
    }

    function insertImages(imagesArr) {
        const imgElements = [];
        const imagesContainer = document.getElementById('images');
        imagesArr.forEach(item => {
            const element = imagesContainer.insertAdjacentHTML('beforeend',`<div class="img-element"><img src="${item.url}"></div>`)
        });
    }


};