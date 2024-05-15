try{
    let cursor = document.getElementsByTagName('cursor')[0]
    let clientX;
    let clientY;
    let mouse='up'

    let fakeCursorHidden = false;
    if (localStorage.getItem('fakeCursorHidden')==='true') hideFakeCursor()

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
    function hideFakeCursor(){
        if (fakeCursorHidden){
            cursor.style.display="block"
            document.body.classList.remove('fakeCursorHidden')
            fakeCursorHidden = false;
            localStorage.setItem('fakeCursorHidden', 'false')
        } else{
            cursor.style.display="none"
            document.body.classList.add('fakeCursorHidden')
            fakeCursorHidden = true;
            localStorage.setItem('fakeCursorHidden', 'true')
        }
    }
    if (('ontouchstart' in window)==true||navigator.msMaxTouchPoints>0){
        cursor.style.display="none"
    }
    setInterval(() => {
        if (('ontouchstart' in window)==true||navigator.msMaxTouchPoints>0){
            cursor.style.display="none"
        } else{
            if (fakeCursorHidden) cursor.style.display="none"
            else cursor.style.display="block"
        }
    }, 1000);
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