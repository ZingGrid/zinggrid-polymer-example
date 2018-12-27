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

class MyView4 extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
        }

        /*  while the grid is in a loading state give it a default height to prevent screen jank */
        zing-grid[loading] {
          height:500px;
        }
      </style>

      <div>
        <!-- 
        adding loading attribute before grid load is a native way to style the grid
        in a loading state. This is useful if you know the data is being fetched. -->
        <zing-grid 
          id="ajaxGrid" 
          caption="Shows" 
          editor
          loading>
        </zing-grid>

      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    const _this = this;
    // must stringify data for component/HTML attributes
    fetch('../shows.json', {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).then(res => {
        if (res.status !== 200) {
          throw new Error('Status was not 200');
        }

        // return a promise converting to json
        return res.json();
      })
      .then(gridData => {
        // if we made it here great news
        console.log(gridData);
        // purposely timeout so the loading screen displays longer
        setTimeout(() => {
          _this.$.ajaxGrid.setData(gridData.shows);
        }, 2000);
      })
      .catch(err => {
        console.log(err)
      })
  }
}

window.customElements.define('my-view4', MyView4);
