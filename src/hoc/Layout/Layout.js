import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseLine from '@material-ui/core/CssBaseline';

import Aux from '../Aux/Aux';
import ToolbarComponent from '../../components/Navigation/ToolbarComponent/ToolbarComponent';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const Layout = () => {
    const classes= useStyles();

    return (
        <Aux>
            <div className={classes.root}>
                <CssBaseLine />
                <ToolbarComponent />
            </div>
        </Aux>
    );
};

export default Layout;