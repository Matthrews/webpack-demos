// import _ from 'lodash'
import $ from 'jquery'
import './index.less'

// import logo from './bird.jpg'

// console.log('logo', logo);

const Component = () => {
    var $div = $('<div />');

    $div.html(['Hello', 'World!', 'matthew'], ' ')

    return $div;
}

$(document.body).append(Component())

import('./bird.jpg').then(logo => {
    console.log('logo', logo.default);
    var $png = $(`<img src=${logo.default}/>`)

    $(document.body).append($png)
})
