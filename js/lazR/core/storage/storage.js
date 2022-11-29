const STORAGE = localStorage;
const appShortName = 'testSPA';

if (STORAGE.getItem(`${appShortName}FirstTime`) === null) {
    STORAGE.setItem(`${appShortName}FirstTime`, '0');
    let userTMP = {
        isDev: false,
        settings: [
            {
                id: 'screen',
                name: 'Screen',
                settings: [
                    {
                        id: 'keepScreenAwake',
                        name: 'Keep screen awake',
                        isActive: true
                    }
                ]
            },
            {
                id: 'audio',
                name: 'Audio',
                settings: [
                    {
                        id: 'menuMusic',
                        name: 'Music (menu)',
                        isActive: true
                    }
                ]
            },
            {
                id: 'advanced',
                name: 'Advanced',
                settings: [
                    {
                        id: 'jsonWizard',
                        name: 'Enable JSON Wizard',
                        isActive: false
                    }
                ]
            }
        ]
    };
    STORAGE.setItem(`${appShortName}User`, JSON.stringify(userTMP));
}
/* ------------------------------------------------------------------------- */
export const getUser = () => {
    return JSON.parse(STORAGE.getItem(`${appShortName}User`));
}
export const setUser = (user) => {
    STORAGE.setItem(`${appShortName}User`, JSON.stringify(user));
}
export const isUserDev = () => {
    const user = getUser();
    return user.isDev;
}
/* ------------------------------------------------------------------------- */
export const getUserSetting = (id) => {
    let settingToReturn = '';
    const user = getUser();
    const settings = user.settings;
    settings.forEach(settingsGroups => {
        settingsGroups.settings.forEach(setting => {
            if (setting.id == id) {
                settingToReturn = setting;
            }
        });
    });
    return settingToReturn;
}