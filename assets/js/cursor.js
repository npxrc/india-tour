try{
    let cursor = document.getElementsByTagName('cursor')[0]
    let clientX;
    let clientY;
    let mouse='up'

    window.onpointermove = event => { 
        cursorActive();
        clientX = event.clientX;
        clientY = event.clientY;
        cursor.animate({
            left: `${clientX}px`,
            top: `${clientY+scrollY}px`
        }, { duration: 500, fill: "forwards" });
        hidecursor = setTimeout(() => {cursorIdle()}, 2500);
    }
    cursor.style.display="none"
    function openURL(url, bypass){
        if (bypass) return window.open(url)
        if (confirm('This will open in a new window, continue?')){
            window.open(url)
        }
    }
    window.addEventListener('mousedown', (event) => {
        cursorActive();
        cursor.classList.add('mousedown')
        mouse='down'
        let parentClassList=event.target.parentElement.classList[2]
        let elemClassList=event.target.classList[0]
        if (elemClassList!==null && elemClassList !==undefined && (elemClassList.toString().startsWith('https://')||elemClassList.toString().startsWith('./'))) openURL(elemClassList, elemClassList.toString().startsWith('./'))
        else if (parentClassList!==null && parentClassList!==undefined && (parentClassList.toString().startsWith('https://')||parentClassList.toString().startsWith('./'))) openURL(parentClassList, parentClassList.toString().startsWith('./'))
        if (elemClassList!==null && elemClassList !==undefined && elemClassList.toString().startsWith('#')) {
            $(elemClassList.replace('#','')).scrollIntoView();
            window.scrollBy(0, $(elemClassList.replace('#','')).offsetTop)
        }
        else if (parentClassList !==null &&parentClassList !==undefined && parentClassList.toString().startsWith('#')) {
            $(parentClassList.replace('#','')).scrollIntoView();
            window.scrollBy(0, ($(parentClassList.replace('#','')).offsetTop+$(parentClassList.replace('#','')).offsetHeight))
        }
        console.log(elemClassList, parentClassList);
    });
    window.addEventListener('mouseup', () => {
        cursor.classList.remove('mousedown')
        mouse='up'
        hidecursor = setTimeout(() => {cursorIdle()}, 2500);
    });
    window.addEventListener('scroll', () => {
        cursor.classList.remove('idle')
        clearTimeout(hidecursor);
        cursor.animate({
            left: `${clientX}px`,
            top: `${clientY+scrollY}px`
        }, { duration: 750, fill: "forwards" });
    });
    function cursorActive(){
        cursor.classList.remove('idle')
        clearTimeout(hidecursor);
    }
    function cursorIdle(){
        if (mouse=='down') return;
        cursor.classList.add('idle');
        clearTimeout(hidecursor);
    }
    let hidecursor = setTimeout(() => {cursorIdle()}, 2500);
}
catch(e){
	showErrorModal(e, 'cursor.js');
}