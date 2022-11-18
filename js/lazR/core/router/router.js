import * as APP_ROUTER from '../../../app-router.js'

const getPageRegex = /(?<=page=)\w+/g;

document.onmouseover = function() {
    //User's mouse is inside the page.
    window.innerDocClick = true;
}

document.onmouseleave = function() {
    //User's mouse has left the page.
    window.innerDocClick = false;
}

let historyArray = [];
let stack = 0;

export const getStack = () => {
    return stack;
}

export const navigateTo = (URL) => {
    if ((window.location.hash.length == 0 && URL == './') || window.location.hash == '#' + URL) {
        console.log('no change');
    } else {
        window.innerDocClick = true;
        console.log(`navigateTo ${URL}`);
        historyArray.push(window.location.hash);
        console.log(historyArray);
        window.location.hash = URL;
        // the rest happens on the onHashChange function
    }
}
window.navigateTo = navigateTo;

window.onhashchange = function() {
    console.log('On hash change');
    if (window.innerDocClick) {

        // App navigation

        window.innerDocClick = false;
        let pageArray = window.location.hash.match(getPageRegex);
        if (pageArray != null) {
            const page = pageArray[0];
            navigate(page, true, false);
        } else {
            navigate(null, true, false);
        } 
    } else {
        // Browser navigation
        if (window.location.hash != '#undefined') {
            console.log('back');
            window.location.hash = historyArray[historyArray.length-1];
    
            if (window.location.hash.length != 0) {
                let pageArray = window.location.hash.match(getPageRegex);
                if (pageArray != null) {
                    const page = pageArray[0];
                    navigate(page, false);
                } else {
                    console.log('backward to accueil');
                    navigate(null, false, false);
                } 
            } else {
                console.log('backward to ROOT');
                navigate(null, false, true);
            }
            historyArray.pop();
        } else {
            console.log('backward to ROOT');
            navigate(null, false, true);
        }
    }
}

const navigate = (page, isGoingForward, isRootPage) => {
    let main;
    if (isGoingForward) {
        let currentMain = document.getElementById('main');
        currentMain.setAttribute('id', `oldMain${stack}`);
        currentMain.classList.remove('sliding-page');
        currentMain.classList.add('pseudo-main');
        
        const newMain = document.createElement('div');
        newMain.setAttribute('id', 'main');
        newMain.setAttribute('class', 'sliding-page');

        stack += 1;
        
        main = newMain;
        APP_ROUTER.pushView(main, page);
        document.getElementById('body').appendChild(main);
        
        setTimeout(() => {
            main.style.top = 'var(--header-height)';
            main.style.opacity = 1;
            setTimeout(() => {
                currentMain.classList.add('hidden-old-main');
                currentMain.classList.remove('pseudo-main');
            }, 300);
        }, 20);
        

    } else {
        let currentMain = document.getElementById('main');
        currentMain.setAttribute('id', '');

        let oldMain = document.getElementById(`oldMain${stack - 1}`);
        oldMain.setAttribute('id', 'main');
    
        oldMain.classList.remove('hidden-old-main');
        if (isRootPage) {
            oldMain.classList.add('pseudo-main');
            historyArray = [];
        } else {
            oldMain.classList.add('sliding-page');
        }

        currentMain.style.top = '100%';
        currentMain.style.opacity = 0;
        setTimeout(() => {
            currentMain.remove();
        }, 300);

        stack -= 1
    }     
}