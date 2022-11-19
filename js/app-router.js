import * as PAGE_INDEX from './layout/pages/index/index.page.js'
import * as PAGE_ABOUT from './layout/pages/about/about.page.js'
import * as PAGE_JSON_WIZARD from './layout/pages/jsonWizard/jsonWizard.page.js'
import * as PAGE_SETTINGS from './layout/pages/settings/settings.page.js'

import { music } from './app.js'

export const pushView = (parentComponent, page) => {
    switch (page) {
        case 'about':
            parentComponent.appendChild(PAGE_ABOUT.renderPage());
            break;
        case 'jsonWizard':
            parentComponent.appendChild(PAGE_JSON_WIZARD.renderPage());
            break;
        case 'settings':
            parentComponent.appendChild(PAGE_SETTINGS.renderPage());
            break;
        default:
            if (music.duration > 0 && !music.paused) {
                console.log('is aldrady playing');
            } else {
                music.play();
            }
            parentComponent.appendChild(PAGE_INDEX.renderPage());
            break;
    } 
}