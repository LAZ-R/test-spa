import * as CORE_MATHS from './core/maths/maths.js'
import * as CORE_DOM from './core/DOM/DOM.js'
import * as CORE_CSS from './core/css/css.js'
import * as CORE_APP_DATA from './core/appData/appData.js'
import * as CORE_STORAGE from './core/storage/storage.js'
import * as CORE_URL from './core/URL/URL.js'
import * as CORE_WAKE_LOCK from './core/wakeLock.js'

/* APP Data */
export const APP_DATA = {
    getAppVersionNumber: () => CORE_APP_DATA.getAppVersionNumber(),
    getAppName: () => CORE_APP_DATA.getAppName()
}

/* CSS */
export const CSS = {
    getCssRootVariableValue: (variableName) => CORE_CSS.getCssRootVariableValue(variableName),
    getFilterStringForHexValue: (hexValue) => CORE_CSS.getFilterStringForHexValue(hexValue),
    applyColorFilterOnElement: (element, hexValue) => CORE_CSS.applyColorFilterOnElement(element,hexValue)
}

/* DOM */
export const DOM = {
    setViewportSize: () => CORE_DOM.setViewportSize(),
    setHTMLTitle: (pageTitle) => CORE_DOM.setHTMLTitle(pageTitle),
    getElementFromHTMLString: (html) => CORE_DOM.getElementFromHTMLString(html),
    createElement: (element, id, className, innerHtml) => CORE_DOM.createElement(element, id, className, innerHtml),
    createImgElement: (id, className, src, alt) => CORE_DOM.createImgElement(id, className, src, alt),
}
/* Breakpoints */
export const BREAKPOINTS = {
    isPhone: CORE_DOM.isPhone,
    isTablet: CORE_DOM.isTablet,
    isTabletOrUp: CORE_DOM.isTabletOrUp,
    isLaptop: CORE_DOM.isLaptop,
    isLaptopOrUp: CORE_DOM.isLaptopOrUp,
    isDesktop: CORE_DOM.isDesktop
}

/* Maths */
export const MATHS = {
    getRandomIntegerBetween: (min, max) => CORE_MATHS.getRandomIntegerBetween(min, max),
    roundTo: (n, digits) => CORE_MATHS.roundTo(n, digits)
};

/* Storage */
export const STORAGE = {
    getUser: () => CORE_STORAGE.getUser(),
    setUser: (user) => CORE_STORAGE.setUser(user),
    getUserSetting: (id) => CORE_STORAGE.getUserSetting(id),
    isUserDev: () => CORE_STORAGE.isUserDev()
}

/* URL */
export const URL = {
    getURLParameter: (parameterName) => CORE_URL.getURLParameter(parameterName)
}

/* Wake Lock */
export const WAKE_LOCK = {
    requestWakeLock: async () => await CORE_WAKE_LOCK.requestWakeLock()
}
