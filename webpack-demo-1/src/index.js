import _ from 'lodash'
import $ from 'jquery'
import './index.less'

const Component = () => {
    var $div = $('<div />');

    $div.html(['Hello', 'World!', 'matthew'], ' ')

    return $div;
}

$(document.body).append(Component())