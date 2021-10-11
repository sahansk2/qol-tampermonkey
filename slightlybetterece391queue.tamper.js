// ==UserScript==
// @name         Slightly Enhanced ECE391 Queue
// @namespace    http://www.github.com/
// @version      0.2
// @description  See https://www.github.com/sahansk2/qol-tampermonkey
// @author       Sahan Kumarasinghe
// @match        http://ece391test.web.illinois.edu/*
// @match        https://ece391test.web.illinois.edu/*
// @icon         https://www.google.com/s2/favicons?domain=illinois.edu
// @grant        unsafeWindow
// ==/UserScript==


(function() {
    'use strict';

const getNetId = () => {
    let res = document.querySelector("#new_question input[name='netid']")?.value
    console.debug('Extracted netId:', res)
    if (res) return res;
    else return "";
}

// The website is going to ask us for notification access anyway, so we just sit back and relax.
const notifyImminentDequeue = () => {
    if (Notification.permission === "granted") {
        new Notification('ECE391 Queue', {
            icon: 'https://courses.engr.illinois.edu/ece391/sp2019/images/logo.png',
            body: "Expect to be dequeued very soon!",
        });
    }
}

const queuePositionUpdates = () => {
    let results = document.querySelectorAll('.question_card h5')
    let taCount = document.querySelectorAll('.ta_info_list > li').length
    console.debug('Number of online TAs', taCount)
    console.debug('Number of questions in the queue:', results.length)

    for (let i = 0; i < results.length; i++) {
        let counterStr = `${i+1}`.padStart(3, '0')
        let counterNode = results[i].querySelector('span')
        let thisNetId = results[i].querySelector('small').innerText
        thisNetId = thisNetId.slice(1,thisNetId.length-1)
        let userNetId = getNetId()
        counterNode.innerText = counterStr
        if (i < taCount) {
            // Expect to be called soon
            counterNode.className += " badge-danger"
            if (thisNetId === userNetId) {
                notifyImminentDequeue()
            }
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
    // Must be logged in for this.
    let netId = getNetId()
    if (netId) {
        document.querySelector(`a[netid="${netId}"]`)?.scrollIntoView({behavior: 'smooth'})
    }
}

const updateCycle = () => {
    queuePositionUpdates()
    scrollToOwnPosition()
}

const observer = new MutationObserver(updateCycle)

observer.observe(document.querySelector('.question-group'), {childList: true})

injectQueueCounter()

updateCycle()

const suppressTANotify = () => { console.debug("TA student-ready notification suppressed.") }

unsafeWindow.notify = suppressTANotify

})();
