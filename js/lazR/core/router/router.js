import * as APP_ROUTER from '../../../app-router.js';

const getPageRegex = /(?<=page=)\w+/g;

/**
 * Changement d'état du "potentiel de clic"
 */
document.onmouseover = () => {
    //le pointeur de l'utilisateur est dans la page.
    window.innerDocClick = true;
}

/**
 * Changement d'état du "potentiel de clic"
 */
document.onmouseleave = () => {
    //le pointeur de l'utilisateur a quitté la page.
    window.innerDocClick = false;
}

let historyArray = [];
let stack = 0;

export const getStack = () => {
    return stack;
}

/**
 * Méthode utilisée pour naviguer au sein de l'application
 * @param {string} URL 
 */
export const navigateTo = (URL) => {
    if ( // Si
        !( // N'est pas
            (window.location.hash.length == 0 && URL == './') // le hash a une longueur de 0 et l'URL de navigation vaut './'
            || window.location.hash == '#' + URL // l'URL ne navigation est l'URL actuelle
        )
    ) {
        window.innerDocClick = true;
        historyArray.push(window.location.hash);
        window.location.hash = URL; // changement d'URL effectué
        // le reste se déroule sur la fonction onHashChange()
    }

    // Sinon l'utilisateur essaye de naviguer su la page sur laquelle il se trouve
}
window.navigateTo = navigateTo;

/**
 * Méthode automatique, déclenchée au changement du hash de l'URL 
 */
window.onhashchange = () => {

    // Navigation interne, toujours en avant
    if (window.innerDocClick) {

        window.innerDocClick = false; // pk ?

        let pageArray = window.location.hash.match(getPageRegex); // on récupère l'URL
        if (pageArray != null) { // si l'URL n'est pas nulle
            const page = pageArray[0];
            navigateForward(page); // on navigue vers cette page
        } else {
            navigateForward(null); // sinon on navigue vers null
        } 

    // Navigation du navigateur
    } else {

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