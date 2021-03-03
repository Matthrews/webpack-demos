import _ from 'lodash'
import $ from 'jquery'
import './index.less'

const Component = () => {
    var $div = $('<div />');

    $div.html(['Hello', 'World!'], ' ')
    return $div;
}

$(document.body).append(Component())