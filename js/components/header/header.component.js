import * as LAZR from '../../lazR/lazR.js';
import * as BURGER_MENU from './burgerMenu/burgerMenu.component.js';

export const renderView = () => {
    const header = document.getElementById('header');

    const headerIndexLink = LAZR.DOM.createElement('a', '', 'header-index-link', '');
    headerIndexLink.setAttribute('href', './');

    const headerLogo = LAZR.DOM.createImgElement('headerLogo', 'header-logo', './medias/images/logo-white.svg', 'lazr logo');
    LAZR.CSS.applyColorFilterOnElement(headerLogo, LAZR.CSS.getCssRootVariableValue('--on-primary'));
    
    headerIndexLink.appendChild(headerLogo);
    header.appendChild(headerIndexLink);
    if (LAZR.BREAKPOINTS.isPhone || LAZR.BREAKPOINTS.isTablet) {
        BURGER_MENU.renderView();
    } else {
        header.appendChild(
            LAZR.DOM.createElement('div', 'headerLinksGroup', 'header-links-group', `
                <a href="./" class="header-link">Home</a>
            `));
    }
}