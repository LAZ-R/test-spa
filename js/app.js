import { renderLayout } from './layout/layout.js';
import * as PAGE_INDEX from './layout/pages/index/index.page.js'

const renderAppHome = () => {
    document.getElementById('main').appendChild(PAGE_INDEX.renderPage());
}

await renderLayout();
renderAppHome();