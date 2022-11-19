import { renderLayout } from './layout/layout.js';
import * as PAGE_INDEX from './layout/pages/index/index.page.js'
import * as ROUTER from './lazR/core/router/router.js'

const getPageRegex = /(?<=page=)\w+/g;
export const music = new Audio('./medias/01 - Mokhov - Halcyon Days.mp3');

const renderAppHome = () => {
    music.play();
    music.loop = true;
    document.getElementById('main').appendChild(PAGE_INDEX.renderPage());
}

await renderLayout();

if (window.location.hash.length == 0) {
    renderAppHome();
} else {
    let pageArray = window.location.hash.match(getPageRegex);
    if (pageArray != null) {
        const page = pageArray[0];
        ROUTER.navigate(page, true, false);
    } else {
        console.log('backward to accueil');
        ROUTER.navigate(null, true, false);
    }
}