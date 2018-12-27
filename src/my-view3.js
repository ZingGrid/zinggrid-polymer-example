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
import '@polymer/iron-autogrow-textarea/iron-autogrow-textarea.js';

// import ZingGrid
import ZingGrid from 'zinggrid';

class MyView3 extends PolymerElement {
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
          id="twoWayGrid"
          data="{{stringData}}"
          caption="Edit Cells in Grid OR update data in input field"
          editor-controls>
        </zing-grid>

        <br>

        <h3>Stored Data</h3>
        <p>Paste your JSON data here</p>
        <iron-autogrow-textarea value="{{stringData}}"></iron-autogrow-textarea>

      </div>
    `;
  }

  // initialize vars
  constructor() {
    super();
    // assign dataset on mount to trigger watch change
    this.datastore = [
      { "breed": "Chow Chow", "name": "Butter"},
      { "breed": "Dachshund", "name": "Sousage"},
      { "breed": "Pug", "name": "Potat"},
      { "breed": "Corgi", "name": "Plop"},
      { "breed": "Pomeranian", "name": "Floof"}
    ];
    // stringified data
    this.stringData = '';
  }

  // init data
  connectedCallback() {
    super.connectedCallback();
    // assign grid data
    this.stringifyData();
    // assign editor callback to catch data updates
    // full row edit 
    this.$.twoWayGrid.addEventListener('data:recordchange', this.dataChanged.bind(this));
    // single cell change (double click cell)
    this.$.twoWayGrid.addEventListener('data:cellchange', this.dataChanged.bind(this));
    // row insert
    this.$.twoWayGrid.addEventListener('data:recordinsert', this.dataInsert.bind(this));
    // row delete
    this.$.twoWayGrid.addEventListener('data:recorddelete', this.dataDelete.bind(this));
  }
  
  // manager store updates
  dataChanged(e) {
    console.log(`--- data:changed fired ---`, e.detail);

    let rowIndex = e.detail.ZGData.rowIndex;
    let newValues = {
      breed: e.detail.ZGData.data.breed,
      name: e.detail.ZGData.data.name
    };

    // update the object in datastore at the correct
    // array position
    // eg) currentDataSet['name'] = 'new value'
    this.datastore[rowIndex] = newValues;
    this.stringifyData();
  }

  // manage inserting rows to store
  dataInsert(e) {        
    console.log(`--- data:insert fired ---`, e.detail);
    let newValues = {
      breed: e.detail.ZGData.data.breed,
      name: e.detail.ZGData.data.name,
    };
    // push record to our array
    this.datastore.push(newValues);
    this.stringifyData();
  }

  // manage deleting rows to store
  dataDelete(e) {        
    console.log(`--- data:delete fired ---`, e.detail);
    let recordIndex = e.detail.ZGData.data.nOriginalIndex;
    // filter deleted row from datastore containing array of objects
    this.datastore = this.datastore.filter((ele, index) => index != recordIndex);
    this.stringifyData();
  }
  
  // update store data for textarea input and grid
  stringifyData(val) {
    // must stringify data for component/HTML attributes
    this.stringData = JSON.stringify(this.datastore);
    // alternatively can use API to set data. We chose
    // to show off attribute binding first
    // this.$refs.demoGrid.setData(this.datastore);
  }
  
  // toggle theme attribute on grid
  updateGridTheme(e) {
    let newThemeValue = e.target.value;
    this.theme = newThemeValue;
  }
}

window.customElements.define('my-view3', MyView3);
