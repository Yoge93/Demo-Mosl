/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */
import { div, ul, li, a, p } from "../../scripts/dom-helpers.js"

export default function decorate(block) {
    [...block.children].forEach((row) => {
        // decorate accordion item label
        const label = row.children[0];
        const summary = document.createElement('summary');
        summary.className = 'accordion-item-label';
        summary.append(...label.childNodes);
        // decorate accordion item body
        const body = row.children[1];
        body.className = 'accordion-item-body';
        const details = document.createElement('details');
        details.className = 'accordion-item';
        details.append(summary, body);
        row.replaceWith(details);
    });


    // mobile view or desktop view
    function isMobileDevice() {
        return window.innerWidth <= 768;
    }


    if (!isMobileDevice()) {
        const destContainer = div({ class: "accordian-container" },
            div({ class: "left-container" },
                ul({ class: "left-container-items" },
                    ...Array.from(block.children).map((element, uindex) => {
                        return li({
                            class: (uindex ? "left-container-item" : "left-container-item active"),
                            id: uindex,
                            onclick: ((event) => {
                                const myid = `left-${event.target.id}`;
                                // document.getElementById(event.target.id).classList.add('active')
                                document.querySelectorAll('.left-container-item').forEach(function (item, index) {
                                    if (event.target.id == index) {
                                        item.classList.add('active');
                                    } else {
                                        item.classList.remove('active');
                                    }
                                })
                                destContainer.querySelectorAll('.left-container-subitem').forEach(function (each) {
                                    if (each.dataset.targetId == myid) {
                                        each.classList.remove('dsp-none');
                                    } else {
                                        each.classList.add('dsp-none');
                                    }
                                })
                            })
                        }, element.querySelector(".accordion-item-label").textContent.trim());
                    })
                )
            ),
            div({ class: "right-container" },
                div({ class: "right-container-element" },
                    ...Array.from(block.children).map((element, index) => {
                        return div({ class: (index ? "left-container-subitem dsp-none" : "left-container-subitem"), 'data-target-id': `left-${index}` }, element.querySelector(".accordion-item-body"))
                    })
                )
            )
        )
        block.parentElement.append(destContainer)
        document.querySelector('.accordion').style.display = "none"
    }
}