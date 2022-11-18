import * as LAZR from '../../../lazR/lazR.js';

let isMenuVisible = false;
const onPrimaryFilter = LAZR.CSS.getFilterStringForHexValue(LAZR.CSS.getCssRootVariableValue('--on-primary'));

const closeMenu = () => {
    document.getElementById('burgerMenuBackground').style.opacity = '0%';
    
    document.getElementById('headerBurgerMenuButton').style.opacity = '0%';
    setTimeout(() => {
        document.getElementById('headerBurgerMenuButton').innerHTML = `
            <img src="./medias/images/font-awsome/bars-solid.svg" class="burger-menu-header-button-icon" style="filter: ${onPrimaryFilter};" />`;
        document.getElementById('headerBurgerMenuButton').style.opacity = '100%';
    }, 100);
    
    LAZR.BREAKPOINTS.isTablet
        ? document.getElementById('burgerMenu').style.right = '-40%'
        : document.getElementById('burgerMenu').style.right = '-70%';
    setTimeout(() => {
        document.getElementById('burgerMenuBackground').style.display = 'none';
    }, 200);

    isMenuVisible = false;
}
const openMenu = () => {
    document.getElementById('burgerMenuBackground').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('burgerMenuBackground').style.opacity = '50%';
    }, 10);

    document.getElementById('headerBurgerMenuButton').style.opacity = '0%';
    setTimeout(() => {
        document.getElementById('headerBurgerMenuButton').innerHTML = `
            <img src="./medias/images/font-awsome/xmark-solid.svg" class="burger-menu-header-button-icon" style="filter: ${onPrimaryFilter}" />`;
        document.getElementById('headerBurgerMenuButton').style.opacity = '100%';
    }, 100);
    
    document.getElementById('burgerMenu').style.right = 0;
    
    isMenuVisible = true;
}

let versionNumberClick = 0;

const handleVersionNumberClick = () => {
    versionNumberClick += 1;
    if (versionNumberClick == 6) {
        if (!LAZR.STORAGE.isUserDev()) {
            let user = LAZR.STORAGE.getUser();
            user.isDev = true;
            LAZR.STORAGE.setUser(user);
            window.alert('You now have access to the "Advanced" settings section');
        } else {
            let user = LAZR.STORAGE.getUser();
            user.isDev = false;
            LAZR.STORAGE.setUser(user);
            window.alert('You now lose access to the "Advanced" settings section');
        }
        window.location = `./?page=settings`;
    }
}
window.handleVersionNumberClick = handleVersionNumberClick;

export const renderView = () => {

    const headerBurgerMenuButtonArea = LAZR.DOM.createElement('div', 'headerBurgerMenuButtonArea', 'header-burger-menu-button-area', ``);
    const headerBurgerMenuButton = LAZR.DOM.createElement('button', 'headerBurgerMenuButton', 'header-burger-menu-button', `
        <img src="./medias/images/font-awsome/bars-solid.svg" class="burger-menu-header-button-icon" style="filter: ${onPrimaryFilter};" />`);
    headerBurgerMenuButton.onclick = () => isMenuVisible ? closeMenu() : openMenu();
    headerBurgerMenuButtonArea.appendChild(headerBurgerMenuButton);
    document.getElementById('header').appendChild(headerBurgerMenuButtonArea);

    const burgerMenuBackground = LAZR.DOM.createElement('div', 'burgerMenuBackground', 'burger-menu-background', '');
    burgerMenuBackground.onclick = () => closeMenu();
    document.getElementById('body').appendChild(burgerMenuBackground);

    const burgerMenu = LAZR.DOM.createElement('div', 'burgerMenu', 'burger-menu', `
        <div class="burger-menu-pages">
            <a href="./" class="burger-menu-page">Home</a>
        </div>
        <div class="burger-menu-bottom">
            <div class="burger-menu-utils">   
                ${LAZR.STORAGE.getUserSetting('jsonWizard').isActive ? `
                <a href="./?page=jsonWizard" class="burger-menu-page burger-menu-util">
                    <div class="util-icon-area">
                        <img class="util-icon" src="./medias/images/font-awsome/wand-magic-sparkles-solid.svg" alt="a magic wand with sparkles" style="filter: ${onPrimaryFilter};" />
                    </div>                    
                    <span>JSON Wizard</span>
                </a>` : ''}
                <a href="./?page=settings" class="burger-menu-page burger-menu-util">
                    <div class="util-icon-area">
                        <img class="util-icon" src="./medias/images/font-awsome/gear-solid.svg" alt="gear" style="filter: ${onPrimaryFilter};" />
                    </div>                    
                    <span>Settings</span>
                </a>
                <a href="./?page=about" class="burger-menu-page burger-menu-util">
                    <div class="util-icon-area">
                        <img class="util-icon" src="./medias/images/font-awsome/circle-info-solid.svg" alt="information mark" style="filter: ${onPrimaryFilter};" />
                    </div>                    
                    <span>About</span>
                </a>
            </div>
            <div class="burger-menu-app-data">
                <span style="user-select: none;" onclick="handleVersionNumberClick()">v${LAZR.APP_DATA.getAppVersionNumber()}</span>
                <span>&copy; ${new Date().getFullYear()} • laz_R</span>
            </div>
        </div>`);
    document.getElementById('body').appendChild(burgerMenu);
}
