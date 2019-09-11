window.onload = async function() {
    const lsKey = 'images';
    
    fetchData();
    
    async function fetchData() {
        const savedState = localStorage.getItem(lsKey);
        if(savedState) {
            insertImages(JSON.parse(savedState));
            return;
        }
        const fechData = await fetch('https://jsonplaceholder.typicode.com/photos');
        if(fechData.ok) {
            const jsonData = await fechData.json();
            const imagesData = jsonData.slice(0, 12);
            saveState(imagesData);
            insertImages(imagesData);
        }
    }

    function insertImages(imagesArr) {
        const imgElements = [];
        const imagesContainer = document.getElementById('images');
        imagesArr.forEach(item => {
            const elem = createElement(`<img src="${item.url}" class="img-element" draggable="true" id=${item.id}>`);
            setDragable(elem);
            imagesContainer.appendChild(elem);
        });
    }

    function setDragable(elem) {
        elem.addEventListener('drop', drop);
        elem.addEventListener('dragover', allowDrop);
        elem.addEventListener('dragstart', drag);
    }

    function saveState(imagesArr) {
        localStorage.setItem(lsKey, JSON.stringify(imagesArr));
    }

    function updateStateOnDrop(insertBeforeId, insertableId) {
        const savedState = JSON.parse(localStorage.getItem(lsKey));
        const insertBeforeIndex = savedState.findIndex(item => item.id === Number(insertBeforeId));
        const insertableIndex = savedState.findIndex(item => item.id === Number(insertableId));
        if(insertBeforeIndex - 1 === insertableIndex) return;
        const insertableItem = savedState.splice(insertableIndex, 1)[0];
        if(insertableIndex < insertBeforeIndex) {
            savedState.splice(insertBeforeIndex - 1, 0, insertableItem);
        } else {
            savedState.splice(insertBeforeIndex, 0, insertableItem);
        }
        
        saveState(savedState);
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }
      
    function drag(ev) {
        console.log('drag', ev);
        ev.dataTransfer.setData("text", ev.target.id);
    }
      
    function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.insertAdjacentElement('beforebegin', document.getElementById(data));
        updateStateOnDrop(ev.target.id, data);
    }

    function createElement (domString) {
        return new DOMParser().parseFromString(domString, 'text/html').body.firstChild;
    }

};