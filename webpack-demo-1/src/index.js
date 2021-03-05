// import _ from 'lodash'
import $ from 'jquery'
import './index.less'

import logo from './logo.png'

console.log('logo', logo);

const Component = () => {
    var $div = $('<div />');

    $div.html(['Hello', 'World!', 'matthew'], ' ')

    return $div;
}

$(document.body).append(Component())


var $png = $(`<img src=${logo}/>`)

$(document.body).append($png)