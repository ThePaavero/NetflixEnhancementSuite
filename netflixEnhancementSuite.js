// ==UserScript==
// @name         Netflix Enhancement Suit
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Get rid of annoying Netflix features
// @author       ThePaavero
// @match        https://www.netflix.com/browse
// @grant        none
// ==/UserScript==

(function () {

    'use strict';

    function tick() {
        getRidOfAlmostSeenFlicks();
        getRidOfWatchItAgainFlicks();
    }

    function getRidOfAlmostSeenFlicks() {
        var continueWatchingRow = document.querySelector('[data-reactid="55"]');
        var flicks = continueWatchingRow.querySelectorAll('.slider-item');
        [].forEach.call(flicks, function (flickElement) {
            if (!flickElement || !flickElement.style) {
                return;
            }
            var progressBar = flickElement.querySelector('.progress-bar > .progress-completed');
            if (!progressBar) {
                return;
            }
            var percentage = parseInt(progressBar.style.width.replace('%', ''), 10);
            if (percentage > 85) {
                flickElement.remove();
            }
        });
    }

    function getRidOfWatchItAgainFlicks() {
        var titleElement = document.querySelector('.rowTitle[type="watchAgain"]');
        if (!titleElement) {
            return;
        }
        var rowElement = titleElement.parentElement.parentElement;
        rowElement.remove();
    }

    setInterval(tick, 1000);
})();
