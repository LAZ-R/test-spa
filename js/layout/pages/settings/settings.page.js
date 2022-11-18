import * as BurgerMenu from '../../../components/header/burgerMenu/burgerMenu.component.js';
import { getStack } from '../../../lazR/core/router/router.js';
import * as LAZR from '../../../lazR/lazR.js';



const handleCheck = (id) => {
    console.log('handle check ' + id);
    let user = LAZR.STORAGE.getUser();
    console.log(`user from storage before modification :`);
    console.log(user);
    console.log(document.getElementById(`${id}`).checked);

    let shoudlRefresh = false;
    user.settings.forEach(settingsGroups => {
        settingsGroups.settings.forEach(setting => {
            if (`${setting.id}${getStack()}`== id) {
                setting.isActive = document.getElementById(id).checked;
                if (setting.id == 'jsonWizard') shoudlRefresh = true;
            }
        });
    });

    console.log(`user after modification :`);
    console.log(user);
    LAZR.STORAGE.setUser(user);
    console.log(`user from storage afer save : `);
    console.log(LAZR.STORAGE.getUser());
    if (shoudlRefresh) {
        BurgerMenu.refresh();
    }
};
window.handleCheck = handleCheck;

const renderSettingsGroup = (settingsGroup) => {
    let str = `
    <div id="settingsGroup${settingsGroup.id}" class="settings-group">
        <span class="settings-group-name">${settingsGroup.name}</span>`
        
    settingsGroup.settings.forEach(setting => {
        str += `
        <div class="setting-tile">
            <div class="setting-label-area">
                <span class="setting-label">${setting.name}</span>
            </div>
            <div class="setting-switch-area">
                <label class="switch" for="${setting.id}${getStack()}">
                    <input id="${setting.id}${getStack()}" type="checkbox"
                        onclick="handleCheck('${setting.id}${getStack()}')" ${setting.isActive ? "checked" : ""} />
                    <span class="slider round"></span>
                </label>
            </div>    
        </div>`
    });
    str += `</div>`;
    return str;
}


export const renderPage = () => {
    let user = LAZR.STORAGE.getUser();
    console.log(`user from storage from render :`);
    console.log(user);
    LAZR.DOM.setHTMLTitle('Settings');

    const page = LAZR.DOM.createElement('div', 'settingsPage', 'page', `
        <h1 style="padding-left: var(--horizontal-padding)">Settings</h1>`);
        user.settings.forEach(settingsGroup => {
        if ((settingsGroup.name == 'Advanced' && LAZR.STORAGE.isUserDev()) || settingsGroup.name != 'Advanced') {
            page.appendChild(LAZR.DOM.getElementFromHTMLString(renderSettingsGroup(settingsGroup)));
        }
    });

    return page;
}