import { renderLayout } from './layout/layout.js';
import * as LAZR from './lazR/lazR.js';
import * as PAGE_INDEX from './layout/pages/index/index.page.js'
import * as ROUTER from './lazR/core/router/router.js'

const getPageRegex = /(?<=page=)\w+/g;
export const music = new Audio('./medias/audio/music/Mokhov_Halcyon_Days.mp3');
music.loop = true;

const renderAppHome = () => {
    document.getElementById('main').appendChild(PAGE_INDEX.renderPage());
}

// Execution ------------------------------------------------------------------

await renderLayout();

if (LAZR.STORAGE.getUserSetting('menuMusic').isActive) {
    music.play();
}

if (window.location.hash.length == 0) {
    renderAppHome();
} else {
    let pageArray = window.location.hash.match(getPageRegex);
    if (pageArray != null) {
        const page = pageArray[0];
        ROUTER.navigateForward(page);
    } else { 
        ROUTER.navigateForward(null);
    }
}