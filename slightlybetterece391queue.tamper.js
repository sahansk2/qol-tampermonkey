// ==UserScript==
// @name         Slightly Enhanced ECE391 Queue
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  A REALLY hacky TamperMonkey script that I might not ever maintain. Ever. In fact, the course staff might
// @description  update the site and break this script unintentionally (or intentionally), but that's totally OK -- you use this at your own risk.
// @description  This script just adds queue position numbers, automatic number highlighting based
// @description  on queue position, and automatic scrolling towards your own NetID in the queue.
// @author       Sahan Kumarasinghe
// @match        http://ece391test.web.illinois.edu/*
// @match        https://ece391test.web.illinois.edu/*
// @icon         https://www.google.com/s2/favicons?domain=illinois.edu
// @grant        none
// ==/UserScript==

/*
Copyright (C) 2021 Sahan Kumarasinghe

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

(function() {
    'use strict';

    // ==UserScript==
// @name     Unnamed Script 523372
// @version  1
// @grant    none
// ==/UserScript==

const getNetId = () => {
    let res = document.querySelector("#new_question input[name='netid']")?.value
    console.debug('Extracted netId: ', res)
    if (res) return res;
    else return "";
}
const updatePos = () => {
    console.debug('Entering updatePos')
    let results = document.querySelectorAll('.question_card h5')
    let taCount = document.querySelectorAll('.ta_info_list > li').length
    console.debug('Number of online TAs', taCount)
    console.debug('Number of questions in the queue:', results.length)

    for (let i = 0; i < results.length; i++) {
        let counterStr = `${i+1}`.padStart(3, '0')
        let counterNode = results[i].querySelector('span')
        let netId = results[i].querySelector('small').innerText
        netId = netId.slice(1,netId.length-1) // Trim parens
        counterNode.innerText = counterStr
        if (i < taCount) {
            // Expect to be called soon
            counterNode.className += " badge-danger"
        } else if (i >= taCount*2) {
            counterNode.className += " badge-secondary"
        } else {
            // You might be called in the next cycle (just a heuristic)
            counterNode.className += " badge-warning"
        }
    }

}

const injectQueueCounter = () => {
    for (let c of document.querySelectorAll('.question_card h5')) {
        let counterNode = document.createElement('span')
        counterNode.className = "badge badge-pill"
        counterNode.appendChild(document.createTextNode('Number'))
        c.insertBefore(counterNode, c.firstChild)
    }
}

const highlightSelf = () => {
    document.querySelector
}

// Safari users won't get this, because Safari is the new IE.
const scrollToOwnPosition = () => {
    // Obviously this is only going to work if you
    let netId = getNetId()
    if (netId) {
        document.querySelector(`a[netid="${netId}"]`)?.scrollIntoView({behavior: 'smooth'})
    }
}

const updateCycle = () => {
    updatePos()
    scrollToOwnPosition()
}

const observer = new MutationObserver(updateCycle)
let questions = document.querySelector('.question-group')
if (questions) {
    observer.observe(questions, {childList: true})
    injectQueueCounter()
    updateCycle()
}
})();
