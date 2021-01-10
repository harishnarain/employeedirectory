import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Aux from '../../../hoc/Aux/Aux';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        textAlign: 'center'
    }
}));

const AppBarItems = props => {
    const classes = useStyles();

    return (
        <Aux>
            <Typography variant="h6" className={classes.title}>
                Employee Directory
            </Typography>
        </Aux>
    );
};

export default AppBarItems;