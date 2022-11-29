import * as LAZR from '../../lazR/lazR.js';
import * as BURGER_MENU from './burgerMenu/burgerMenu.component.js';

const headerNavigateTo = (URL) => {
    if (BURGER_MENU.menuIsVisible()) {
        BURGER_MENU.closeMenu();
    }
    LAZR.ROUTER.navigateTo(URL);
}
window.headerNavigateTo = headerNavigateTo;

export const renderView = () => {
    const header = document.getElementById('header');

    const headerIndexLink = LAZR.DOM.createElement('a', '', 'header-index-link', '');
    headerIndexLink.setAttribute('onclick', "headerNavigateTo('./')");

    const headerLogo = LAZR.DOM.createImgElement('headerLogo', 'header-logo', './medias/images/logo-white.svg', 'lazr logo');
    headerLogo.style = `filter: ${LAZR.CSS.getRootColorFilterValue('--on-primary')}`;
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