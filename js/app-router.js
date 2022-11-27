import * as PAGE_INDEX from './layout/pages/index/index.page.js';
import * as PAGE_ABOUT from './layout/pages/about/about.page.js';
import * as PAGE_SETTINGS from './layout/pages/settings/settings.page.js';
import * as PAGE_JSON_WIZARD from './layout/pages/jsonWizard/jsonWizard.page.js';

export const pushView = (parentComponent, page) => {
    switch (page) {
        case 'about':
            parentComponent.appendChild(PAGE_ABOUT.renderPage());
            break;
        case 'settings':
            parentComponent.appendChild(PAGE_SETTINGS.renderPage());
            break;
        case 'jsonWizard':
            parentComponent.appendChild(PAGE_JSON_WIZARD.renderPage());
            break;
        default:
            parentComponent.appendChild(PAGE_INDEX.renderPage());
            break;
    } 
}