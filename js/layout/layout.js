import * as LAZR from '../lazR/lazR.js'
import * as HEADER from '../components/header/header.component.js'
import * as FOOTER from '../components/footer/footer.component.js'

import * as PAGE_INDEX from './pages/index/index.page.js'
import * as PAGE_ABOUT from './pages/about/about.page.js'
import * as PAGE_JSON_WIZARD from './pages/jsonWizard/jsonWizard.page.js'
import * as PAGE_SETTINGS from './pages/settings/settings.page.js'

const page = LAZR.URL.getURLParameter('page');
const MAIN = document.getElementById('main');

if (LAZR.STORAGE.getUserSetting('keepScreenAwake').isActive) {
    await LAZR.WAKE_LOCK.requestWakeLock();
}
HEADER.renderView();
if (LAZR.BREAKPOINTS.isLaptopOrUp) {
    FOOTER.renderView();
}
switch (page) {
    case 'about':
        MAIN.appendChild(PAGE_ABOUT.renderPage());
        break;
    case 'jsonWizard':
        MAIN.appendChild(PAGE_JSON_WIZARD.renderPage());
        break;
    case 'settings':
        MAIN.appendChild(PAGE_SETTINGS.renderPage());
        break;
    default:
        MAIN.appendChild(PAGE_INDEX.renderPage());
        break;
}
LAZR.DOM.setViewportSize();