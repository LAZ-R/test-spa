import * as LAZR from '../../../lazR/lazR.js';

const renderCreditsForIterations = (iterations) => {
    let str = '';
    for (let index = 0; index < iterations; index++) {
        str += `
        <span class="about-credit">
        <b>Catégorie n°${index + 2}</b><br>
        Lorem ipsum<br>
        <a>Lien vers la ressource</a>
        </span>`
    }
    return str;
}

export const renderPage = () => {

    LAZR.DOM.setHTMLTitle('About');

    const page = LAZR.DOM.createElement('div', 'aboutPage', 'page', '');
    
    const topPart = LAZR.DOM.createElement('div', 'topPart', 'about-category top-part', `
        <div class="about-sub-category about-app-infos">
            <span class="about-sub-category about-app-name">${LAZR.APP_DATA.getAppName()}</span>
            <span class="about-sub-category about-app-version">v${LAZR.APP_DATA.getAppVersionNumber()}</span>
        </div>
        <span class="about-credits-label">Crédits</span>
        <div class="about-sub-category about-credits">
            <span class="about-credit">
                <b>Pack d'icônes</b><br>
                FontAwsome<br>
                <a href="https://fontawesome.com/">https://fontawesome.com/</a>
            </span>
            ${renderCreditsForIterations(6)}
        </div>`);
    page.appendChild(topPart);

    const middlePart = LAZR.DOM.createElement('div', 'middlePart', 'about-category middle-part', `
        <div class="about-sub-category about-warning">
            <div><img src="./medias/images/font-awsome/circle-exclamation-solid.svg" alt="exclamation point" style="filter :${LAZR.CSS.getRootColorFilterValue('--gray-80')};"/></div>
            <span>Attention</span>
            <div><img src="./medias/images/font-awsome/circle-exclamation-solid.svg" alt="exclamation point" style="filter :${LAZR.CSS.getRootColorFilterValue('--gray-80')};"/></div>
        </div>
        <div class="about-sub-category about-warning-text">
            <span>
                Cette application utilise le stockage local de votre appareil pour sauvegarder ses données.<br>
                Toutes les données de cette application seront perdues si vous nettoyez le cache de votre navigateur / appareil.
            </span>
        </div>`);
    page.appendChild(middlePart);

    const bottomPart = LAZR.DOM.createElement('div', 'bottomPart', 'about-category bottom-part', `
        <div class="about-sub-category lazr-card">
            <img class="lazr-logo" src="https://laz-r.github.io/icon-512.webp"/>
        </div>
        <div class="about-sub-category links-card">
            <a class="about-link" href="https://laz-r.github.io/">laz-r.github.io</a>
            <a class="about-link" href="https://github.com/LAZ-R"><img class="github-logo" src="https://png.monster/wp-content/uploads/2022/02/png.monster-703.png"/></a>
        </div>`);
    page.appendChild(bottomPart);

    return page;
}