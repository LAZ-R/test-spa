import * as LAZR from '../../../lazR/lazR.js';

export const renderPage = () => {

    const logHelloWorld = (number) => {
        console.log(`Hello world n°${number}`);
        window.alert(`Hello World n°${number}`)
    }
    window.logHelloWorld = logHelloWorld;

    /* --------------------------------------------------------------------- */
    const pageTitle = LAZR.APP_DATA.getAppName();
    LAZR.DOM.setHTMLTitle(pageTitle);

    const page = LAZR.DOM.createElement('div', 'indexPage', 'page', `
        <h1>${pageTitle}</h1>`);

    for (let n = 0; n < 10; n++) {
        page.appendChild(
            LAZR.DOM.createElement('h2', '', '', `
                Subtitle n°${n + 1}`));
        page.appendChild(
                LAZR.DOM.createElement('p', '', '', `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac nulla nisl. Praesent nec venenatis leo.
                Mauris imperdiet, enim a pulvinar pretium, neque ante varius nibh, non bibendum leo nisl in mi.
                Ut imperdiet tellus elementum, laoreet est quis, sodales libero. Duis posuere ullamcorper lectus at eleifend.<br>
                Cras convallis, velit nec viverra euismod, nunc turpis volutpat metus, ut scelerisque nunc libero ut est.
                Phasellus ut odio semper, volutpat odio a, suscipit massa. Curabitur feugiat erat turpis, in placerat neque tristique a.`));
        if (n == 0) {
            const secondaryButton = LAZR.DOM.createElement('button', 'indexSecondaryButton', 'secondary-button',  `
                Hello World 2`);
            secondaryButton.setAttribute('onclick', 'logHelloWorld(2)');
            page.appendChild(LAZR.DOM.getElementFromHTMLString(`
                <div style="display:flex;justify-content:space-evenly;width: 100%">
                <button class="primary-button" onclick="logHelloWorld(1)">Hello World 1</button>
                ${secondaryButton.outerHTML}
            </div>`))
        }
    }
    page.style.padding = '0px var(--horizontal-padding)';
    /* --------------------------------------------------------------------- */
    
    return page;
}
