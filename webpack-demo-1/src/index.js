import $ from 'jquery'
import './index.less'

const Component = () => {
    var $div = $('<div />');

    $div.html(['Hello', 'World!', 'frank'], ' ')

    return $div;
}

$(document.body).append(Component())

import('./product.png').then(logo => {
    console.log('logo', logo.default);
    var $png = $(`<img src=${logo.default} style="transform: translate(-40%, -40%) scale(.2)" />`)

    $(document.body).append($png)
})
