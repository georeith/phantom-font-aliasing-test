var phantom = require('phantom');
var phInstance;
var phPage;
phantom.create()
    .then(instance => {
        phInstance = instance;
        return instance.createPage();
    }).then(page => {
        phPage = page;
    }).then(() => {
        phPage.property('viewportSize', { width: 1680 * 2, height: 490 * 2 });
        return phPage.open('test.html');
    }).then(() => {
        return phPage.evaluate(function () {
            /* scale the whole body */
            document.body.style.webkitTransform = "scale(2)";
            document.body.style.webkitTransformOrigin = "0% 0%";
            /* fix the body width that overflows out of the viewport */
            document.body.style.width = "50%";
        });
    }).then(() => {
        return phPage.render('output.png');
    }).then(() => {
        phInstance.exit();
        phInstance.kill();
    });
