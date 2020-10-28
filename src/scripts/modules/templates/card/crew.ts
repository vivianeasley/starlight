import { html } from 'lighterhtml';

export const crewCard = function crewCard (cardData:any) {
    if (cardData.type === "damage") {
        return html`
            <div class="sc-wrapper-border">
                <div class="sc-wrapper">
                    <img class="sc-image" src="./images/cards/card-backs.jpg" alt="">
                </div>
            </div>
        `
    }
    return html`
    <div class="sc-wrapper-border">
        <div class="sc-wrapper">
            <img class="sc-image" src="${"./images/crew/"+cardData.image}" alt="">
            <img class="sc-image-border" src="./images/image-border.png" alt="">
            <img class="sc-border" src="./images/card-assets/crew-border.png" alt="">
            <div class="sc-name">${getRankTitle(cardData.rank)} ${cardData.name}</div>
            <div class="sc-position">${cardData.place}</div>
            <div class="sc-types-box" style="${"background-color:"+(getJobColor(cardData.typeJob))}">
                <div class="sc-types">${cardData.typeAlign} - ${cardData.type} - ${cardData.typeJob}</div>
            </div>
            <div class="sc-rules" style="${getFontSizingStyles(cardData.rules.length)}">${cardData.rules}</div>
            ${
                cardData.locked ?
                html`<img class="sc-lock-icon" src="./images/card-assets/icons/lock.png" alt="">`:
                ``
            }
            <img class="sc-rank-icon" src="${"./images/card-assets/ranks/"+cardData.rank+".png"}" alt="">
        </div>
    </div>
`
    function getJobColor (jobType) {
        const colorDict = {
            "engineer":"#00752f",
            "tactical":"#a21f1f",
            "command":"#a59807",
            "science":"#003a75",
            "pilot":"#bb5702",
            "medical":"#006469",
        }
        return colorDict[jobType];
    }

    function getRankTitle (rank:number) {
        const colorArr = [
            "Cpt.",
            "Ofc.",
            "Lt.",
            "Cdt."
        ]

        return colorArr[rank-1];
    }

    function getFontSizingStyles (stringLength) {
        if (stringLength < 111) return "font-size:15px;line-height:0.8rem;";
        if (stringLength > 190) {console.error("rules text too long");return "font-size:11px;line-height:0.65rem;"}
        const baseFontSize = 15;
        const baseLineHeight = 0.65

        const range =  stringLength - 110;
        const sizePoints = Math.ceil(range/20);
        const lhPoints = Math.round(sizePoints * 0.05);
        console.log(Math.ceil(range/20), baseFontSize + sizePoints, baseLineHeight + lhPoints);
        return `font-size:${baseFontSize - sizePoints}px;line-height:${baseLineHeight + lhPoints}rem;`;

    }
}