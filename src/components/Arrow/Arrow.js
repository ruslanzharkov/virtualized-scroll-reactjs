import React, {Component} from 'react';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';

class Arrow extends Component {
    constructor(props) {
        super();
    }

    render() {
        return(
            <div>
                <Icon className={classNames("fa fa-3x fa-arrow-alt-circle-down")} onClick={this.props.scrollBottom}></Icon>
            </div>
        )
    }
}

export default Arrow;