export const moveElement = function moveElement (element, target, animationLength, renderCallback) {
    const voElement = element.getBoundingClientRect();
    const voTarget = target.getBoundingClientRect();

    element.style.transition = "transform "+animationLength+"ms ease-in-out";
    element.style.transform = "translate("+(voTarget.left - voElement.left)+"px,"+(voTarget.top - voElement.top)+"px)";
    setTimeout(() => {
        element.removeAttribute("style");
        if (renderCallback) {
            renderCallback()
        }
    }, animationLength);
  }