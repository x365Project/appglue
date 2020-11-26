import * as React from 'react';
import {capitalize} from '@appglue/common';
import {withRouter} from 'react-router-dom';

interface Props {
    location: {
        pathname: string
    }
}

class NonAuthLayout extends React.Component<Props, {}> {
    constructor(props) {
        super(props);
        this.state = {};
        this.capitalizeFirstLetter.bind(this);
    }

    capitalizeFirstLetter = string => {
        return capitalize(string);
    };

    componentDidMount() {
        let currentage = this.capitalizeFirstLetter(this.props.location.pathname);

        document.title =
            currentage + ' | Skote - Responsive Bootstrap 4 Admin Dashboard';
    }

    render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        );
    }
}

export default withRouter(NonAuthLayout);
