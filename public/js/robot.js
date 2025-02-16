document.addEventListener('DOMContentLoaded', function () {
    const splineViewer = document.querySelector('spline-viewer'); // Взима spline-viewer елемента
    if (splineViewer && splineViewer.shadowRoot) { 
        const logo = splineViewer.shadowRoot.querySelector('#logo'); // Търси елемента в Shadow DOM
        if (logo) {
            logo.remove(); //Премахване на елемента:

        }
    }
});