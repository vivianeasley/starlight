import { produce } from "immer"
import { renderDOM } from "../templates/renderDOM"
import { generateDeck } from "../deck-gen"
import { sendStateData } from "../data-methods/web-rtc"

// Remove history by default. Will enable to get analytics

const lastState = [];

export function initState (data:any) {
    lastState.push(data);
    generateDeck(data);

}

export const updateState = function updateState (updateFucnt:any) {
    lastState[lastState.length - 1]
    const nextState = produce(lastState[lastState.length - 1], updateFucnt);
    renderDOM(nextState);
    lastState.push(nextState);
    return true;
}

export const updateStatePromise = function updateStatePromise (updateFucnt:any) {
    return new Promise((resolve, reject) => {
        try {
            const nextState = produce(lastState[lastState.length - 1], updateFucnt);
            renderDOM(nextState);
            lastState.push(nextState);
            resolve();
        } catch (err) {
            reject(err);
        }
    })
}

export const updateStateSend = function updateState (updateFucnt:any) {
    const nextState = produce(lastState[lastState.length - 1], updateFucnt);
    renderDOM(nextState);
    lastState.push(nextState);
    console.log(nextState)
    if (lastState[lastState.length - 1].data) {
        console.log("data sent!");
        sendStateData(lastState[lastState.length - 1].data.zones)
    }
    return true;
}

export const updateStateSendPass = function updateStateSendPass (updateFucnt:any) {
    const nextState = produce(lastState[lastState.length - 1], updateFucnt);
    renderDOM(nextState);
    lastState.push(nextState);
    sendStateData("passed")
    return true;
}

export function getCurrentState () {
    return lastState[lastState.length - 1];
}

export function getStateHistory() {
    return lastState;
}

export const undo = function undo () {
    if (lastState.length <= 1) return;
    lastState.pop();
    renderDOM(lastState[lastState.length - 1]);
    return true;
}