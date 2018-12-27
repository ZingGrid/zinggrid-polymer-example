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
// import inputs
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-autogrow-textarea/iron-autogrow-textarea.js';
import '@polymer/paper-checkbox/paper-checkbox.js';

// import ZingGrid
import ZingGrid from 'zinggrid';

class MyView2 extends PolymerElement {
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
          id="oneWayGrid"
          caption$="[[captionText]]"
          data="[[stringData]]"
          pager="[[pagerOn]]"
          theme="[[theme]]"
          page-size=5
          page-size-options="2,5,15,25,50">
        </zing-grid>
    
        <br>
    
        <h3>Stored Data</h3>
        <p>Paste your JSON data here</p>
        <iron-autogrow-textarea value="{{stringData}}"></iron-autogrow-textarea>
        <br>
    
        <paper-checkbox checked="{{pagerOn}}">Toggle Pager</paper-checkbox>

        <br>
        <label for="cdBtn">Change Data</label>
        <button id="cdBtn" on-click="changeData">Toggle Datasets</button>

        <br>
        <paper-input always-float-label label="Change Caption" value="{{captionText}}"></paper-input>

        <br>
        <label for="theme-text">Change Theme</label>
        <select id="theme-text" on-change="updateGridTheme">
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
    // model for text
    this.captionText = 'Change Me Please!';
    // model for pager
    this.pagerOn = true; 
    // either 1 or 0
    this.dataIndex = 1; 
    // assign dataset on mount to trigger watch change
    this.datastore = [
      // dataset 1
      [
        [1,2,3], 
        [4,5,6]
      ],
      // dataset 2
      [
        { "breed": "Chow Chow", "name": "Butter"},
        { "breed": "Dachshund", "name": "Sousage"},
        { "breed": "Pug", "name": "Potat"},
        { "breed": "Corgi", "name": "Plop"},
        { "breed": "Pomeranian", "name": "Floof"}
      ]
    ];
    // stringified data
    this.stringData = '';
    // model for theme
    this.theme = 'default'; 
  }

  // init data
  connectedCallback() {
    super.connectedCallback();
    this.stringifyData();
  }
  
  // stringify data for textarea and grid
  stringifyData() {
    this.stringData = JSON.stringify(this.datastore[this.dataIndex]);
  }

  // toggle dataset
  changeData(e) {
    // toggle dataset variable and trigger watch change for grid data
    if (this.dataIndex === 0) this.dataIndex = 1;
    else this.dataIndex = 0;
    this.stringifyData();
  }

  // update theme
  updateGridTheme(e) {
    let newThemeValue = e.target.value;
    this.theme = newThemeValue;
  }
}

window.customElements.define('my-view2', MyView2);
