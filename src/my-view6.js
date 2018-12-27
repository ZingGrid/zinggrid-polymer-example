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

class MyView6 extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div>
        <p>Read more about ZingGrid methods <a href="https://www.zinggrid.com/docs/api-methods" target="_blank">here.</a></p>
        <zing-grid id="methodGrid"></zing-grid>
      
        <br>
      
        <label for="pager-toggle">Toggle Pager</label>
        <input id="pager-toggle" type="checkbox" on-change="setPager" v-model="pagerOn">
      
        <br>
        <input type="text" placeholder="Caption" on-change="setCaption">

      </div>
    `;
  }

  constructor() {
    super();
    this.datastore = [
      { "breed": "Chow Chow", "name": "Butter"},
      { "breed": "Dachshund", "name": "Sousage"},
      { "breed": "Pug", "name": "Potat"},
      { "breed": "Corgi", "name": "Plop"},
      { "breed": "Pomeranian", "name": "Floof"}
    ];
    this.stringData = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.setData();
  }

  setPager(e) {
    this.$.methodGrid.setPager(e.target.checked);
  }

  setCaption(e) {
    this.$.methodGrid.setCaption(e.target.value);
  }

  setData() {
    // must stringify data for component/HTML attributes
    this.stringData = JSON.stringify(this.datastore);
    this.$.methodGrid.setData(JSON.parse(this.stringData));
  }
}

window.customElements.define('my-view6', MyView6);
