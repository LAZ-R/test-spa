import * as LAZR from '../../lazR/lazR.js';

export const renderView = () => {
    document.getElementById('footer').innerHTML =
    `&copy; ${new Date().getFullYear()} - v${LAZR.APP_DATA.getAppVersionNumber()} - <a href="./?page=about">About</a>`;
}