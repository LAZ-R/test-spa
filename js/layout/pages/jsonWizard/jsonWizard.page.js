import * as LAZR from '../../../lazR/lazR.js';

const redirectToJSONWSubPage = (type) => {
    window.location = `./?page=jsonWizard&data=${type}`;
}
window.redirectToJSONWSubPage = redirectToJSONWSubPage;

const copyToClipboard = () => {
    const textarea = document.getElementById('exportTextarea').select();
    document.execCommand("copy");
}
window.copyToClipboard = copyToClipboard;

export const handleSubmitData = () => {
    const sumbittedDataString = document.getElementById('importTextarea').value;
    let isParsable = false;
    try {
        JSON.parse(sumbittedDataString);
        isParsable = true;
    } catch (error) {
        window.alert('Your data are not JSON parsable :(')
    }
    if (isParsable) {
        let isFormattedProperly = false;
        const newUser = JSON.parse(sumbittedDataString.trim());
        console.log('is formatted properly :)');
        try {
            newUser.settings[0].settings[0].id == 'keepScreenAwake'
            isFormattedProperly = true;
        } catch (error) {
            window.alert('Your JSON is not formatted properly for this application');
        }
        if (isFormattedProperly) {
            LAZR.STORAGE.setUser(newUser);
            window.location = './';
        }
    }
}
window.handleSubmitData = handleSubmitData;

export const renderPage = () => {

    const dataOption = LAZR.URL.getURLParameter('data');

    const primaryFilter = LAZR.CSS.getFilterStringForHexValue(LAZR.CSS.getCssRootVariableValue('--primary'));
    const onPrimaryFilter = LAZR.CSS.getFilterStringForHexValue(LAZR.CSS.getCssRootVariableValue('--on-primary'));

    const page = LAZR.DOM.createElement('div', 'jsonWizardPage', 'page', '');

    switch (dataOption) {
        case 'export':
            LAZR.DOM.setHTMLTitle('Export Data');
            const exportTopPart = LAZR.DOM.createElement('div', 'exportTopPart', 'json-wizard-category json-wizard-export-top-part', `
                <div class="json-wizard-intro-area">
                    <h1>Export data</h1>
                    <span>
                        Here you can export your local storage data if you need to save it for later (browser cache cleaning, browser or device update, etc).
                    </span>
                </div>`);
            page.appendChild(exportTopPart);

            const exportMiddlePart = LAZR.DOM.createElement('div', 'exportMiddlePart', 'json-wizard-category json-wizard-export-middle-part', `
                <textarea id="exportTextarea" class="export-textarea" readonly >${JSON.stringify(LAZR.STORAGE.getUser())}</textarea>`);
            page.appendChild(exportMiddlePart);

            const exportBottomPart = LAZR.DOM.createElement('div', 'exportBottomPart', 'json-wizard-category json-wizard-export-bottom-part', `  
                <button id="copyClipboardButton" class="primary-button json-wizard-button" onclick="copyToClipboard()">
                    <span class="json-wizard-category-title">Copy to clipboard</span>
                    <img class="json-wizard-category-icon" src="./medias/images/font-awsome/clipboard-regular.svg" alt="an arrow to the right comming into a rectangle" style="filter: ${onPrimaryFilter};" />
                </button>`);
            page.appendChild(exportBottomPart);
            break;
        case 'import':
            LAZR.DOM.setHTMLTitle('Import Data');
            const importTopPart = LAZR.DOM.createElement('div', 'importTopPart', 'json-wizard-category json-wizard-import-top-part', `
                <div class="json-wizard-intro-area">
                    <h1>Import data</h1>
                    <span>
                        <span style="color: var(--lazr-red)">
                        <b>This feature is for advanced users only.</b><br>
                        <b>Use it at your own risk.</b><br>
                        <br>
                        Here you can paste a stringified JSON to be used as your local storage data.
                        Beware that it needs to be formated <b>exactly</b> as the exported data.<br>
                        <br>
                        <b>This app WILL crash if any data is not formatted properly.</b>
                        </span>
                    </span>
                </div>`);
            page.appendChild(importTopPart);

            const importMiddlePart = LAZR.DOM.createElement('div', 'importMiddlePart', 'json-wizard-category json-wizard-import-middle-part', `
                <textarea id="importTextarea" class="export-textarea" placeholder="paste here"></textarea>`);
            page.appendChild(importMiddlePart);

            const importBottomPart = LAZR.DOM.createElement('div', 'importBottomPart', 'json-wizard-category json-wizard-import-bottom-part', `  
                <button id="submitDataButton" class="warning-button json-wizard-button" onclick="handleSubmitData()">
                    <span>Submit data</span>
                </button>`);
            page.appendChild(importBottomPart);
            break;
        default:
            LAZR.DOM.setHTMLTitle('JSON Wizard');
            const topPart = LAZR.DOM.createElement('div', 'topPart', 'json-wizard-category json-wizard-top-part', `
                <div class="json-wizard-intro-area">
                    <h1>JSON Wizard</h1>
                    <span>
                        Here you can export your local storage data, or import external data into it.
                    </span>
                    <div class="json-wizard-icon-area">
                        <img class="json-wizard-icon" src="./medias/images/font-awsome/wand-magic-sparkles-solid.svg" alt="a magic wand with sparkles" style="filter: ${primaryFilter};" />
                    </div>
                </div>`);
            page.appendChild(topPart);

            const middlePart = LAZR.DOM.createElement('div', 'middlePart', 'json-wizard-category json-wizard-middle-part', `
                <button class="primary-button json-wizard-button" onclick="redirectToJSONWSubPage('export')">
                    <span class="json-wizard-category-title">Export local storage data</span>
                    <img class="json-wizard-category-icon" src="./medias/images/font-awsome/right-from-bracket-solid.svg" alt="an arrow to the right comming from a rectangle" style="filter: ${onPrimaryFilter};" />
                </button>`);
            page.appendChild(middlePart);

            const bottomPart = LAZR.DOM.createElement('div', 'bottomPart', 'json-wizard-category json-wizard-bottom-part', `  
                <button class="primary-button json-wizard-button" onclick="redirectToJSONWSubPage('import')">
                    <span class="json-wizard-category-title">Import data to local storage</span>
                    <img class="json-wizard-category-icon" src="./medias/images/font-awsome/right-to-bracket-solid.svg" alt="an arrow to the right comming into a rectangle" style="filter: ${onPrimaryFilter};" />
                </button>`);
            page.appendChild(bottomPart);
            break;
    }

    return page;
}