/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import ZingGrid from 'zinggrid';

class MyView1 extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div>
        <zing-grid
          id="firstGrid"
          caption="Hello World"
          theme$="[[theme]]">
          <zg-colgroup>
            <zg-column index="0" header="Column 1"></zg-column>
            <zg-column index="1" header="Column 2"></zg-column>
            <zg-column index="2" header="Column 3"></zg-column>
          </zg-colgroup>
        </zing-grid>
        <br>
        <hr>
        <select on-change="updateGridTheme">
          <option value="default">Default</option>
          <option value="android">Android</option>
          <option value="ios">IOS</option>
          <option value="dark">Dark</option>
          <option value="black">Black</option>
        </select>
      </div>
    `;
  }

  // initialize vars
  constructor() {
    super();
    this.theme = 'default';
    this.datastore = [
      [1,2,3], 
      [4,5,6]
    ];
  }

  // init data
  connectedCallback() {
    super.connectedCallback();
    this.$.firstGrid.setData(this.datastore);
  }
  
  // update theme
  updateGridTheme(e) {
    let newThemeValue = e.target.value;
    this.theme = newThemeValue;
  }
}

window.customElements.define('my-view1', MyView1);
