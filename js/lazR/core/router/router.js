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
    if (!((window.location.hash.length == 0 && URL == './') || window.location.hash == '#' + URL)) {
        window.innerDocClick = true;
        historyArray.push(window.location.hash);
        window.location.hash = URL;
        // the rest happens on the onHashChange function
    }

    // else user is trying to navigate to the page he is already on.
}
window.navigateTo = navigateTo;

window.onhashchange = function() {

    if (window.innerDocClick) {
        // App navigation, always forward

        window.innerDocClick = false;
        let pageArray = window.location.hash.match(getPageRegex);
        if (pageArray != null) {
            const page = pageArray[0];
            navigateForward(page);
        } else {
            navigateForward(null);
        } 

    } else {
        // Browser navigation, always backwards

        if (window.location.hash == '') {
            // BACK TO ROOT STACK
            navigateBackward(true);
        } else {
            window.location.hash = historyArray[historyArray.length-1];
            if (window.location.hash == '#./') {
                // BACK TO HOME BUT NOT IS NOT ROOT STACK
                navigateBackward(false);
            } else {
                // BACK TO ANOTHER PAGE
                let pageArray = window.location.hash.match(getPageRegex);
                const page = pageArray[0];
                navigateBackward(false);
            }
        }
        historyArray.pop();
        //console.log(historyArray);
    }
}

export const navigateForward = (page) => {
    let currentMain = document.getElementById('main');
    currentMain.setAttribute('id', `oldMain${stack}`);
    currentMain.classList.remove('sliding-page');
    currentMain.classList.add('pseudo-main');

    stack += 1;

    const newMain = document.createElement('div');
    newMain.setAttribute('id', 'main');
    newMain.setAttribute('class', 'sliding-page');
    APP_ROUTER.pushView(newMain, page);
    document.getElementById('body').appendChild(newMain);
    
    setTimeout(() => {
        newMain.style.top = 'var(--header-height)';
        newMain.style.opacity = 1;
        setTimeout(() => {
            currentMain.classList.add('hidden-old-main');
            currentMain.classList.remove('pseudo-main');
        }, 300);
    }, 20);   
}

export const navigateBackward = (isRootPage) => {
    let currentMain = document.getElementById('main');
    currentMain.setAttribute('id', '');

    let oldMain = document.getElementById(`oldMain${stack - 1}`);
    if (oldMain != null) {
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