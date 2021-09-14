
import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Grid, useMediaQuery } from '@material-ui/core';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import { useSnackbar } from 'notistack';
import RadiusButton from 'components/RadiusButton';
import { MemoizedOutlinedTextField } from 'components/UI/OutlinedTextField';
import { MemoizedOutlinedSelect } from 'components/UI/OutlinedSelect';
import ProgressBar from 'components/UI/ProgressBar';
import ClimbLoading from 'components/ClimbLoading';
import { isEmpty, delay } from 'utils/utility';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        border: `solid 0.5px ${theme.palette.text.secondary}`,
        margin: theme.spacing(0.5),
        borderRadius: '20px'
    },
    dialogTitleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row !important'
    },
    dialogActions: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(3),
        marginRight: -theme.spacing(2 / 8)
    },
    avatar: {
        backgroundColor: 'transparent',
        border: `2px solid ${theme.palette.text.secondary}`,
        height: theme.spacing(9),
        width: theme.spacing(9),
        marginRight: theme.spacing(1)
    },
    chipConatiner: {
        padding: theme.spacing(2.5, 1, 2.5, 1)
    },
    chip: {
        margin: theme.spacing(.5),
        backgroundColor: theme.palette.text.hoverText
    },
    titleLine: {
        marginBottom: theme.spacing(2.5)
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    button: {
        border: 'none',
        background: 'linear-gradient(125deg, #06352d, #36f3d2 80%)',
        width: '100% !important'
    },
    dialogActionContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: 0,
        padding: theme.spacing(3)
    },
    selectContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 8
    },
    loading: {
        width: 'auto !important',
        height: 'auto !important'

    }
}));
const SearchForm = ({ onSearch, onChangeSelect }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'), {
        defaultMatches: true,
    });

    const [loadingStatus, setLoadingStatus] = useState(false);
    const [identifier, setIdentifier] = useState("");


    const inputChangeHandler = (value, name) => {
        setIdentifier(value)
        onChangeSelect(value)
    }
    
    const searchHandler = async () => {
        setLoadingStatus(true);
        await onSearch(identifier);
        setLoadingStatus(false);
    }

    return (
        <div style={{width:'100%'}}>
            <Grid container spacing={5} justify='space-between' direction={isSm ? 'column' : 'row'}>
                <Grid item xs={12} md={3} style={{ width: '80%' }}>
                    <Typography variant='h5'>
                        {/* Identifier List: */}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={5} style={{ width: '100%' }}>
                    <MemoizedOutlinedSelect
                        items = {['Uniswap','Pancakeswap','Compound','Curve','Venus', 'Sushi','Yearn','maker', 'Insta', 'Balancer', 'MDex']}
                        name={identifier}
                        value={identifier}
                        onChange={inputChangeHandler}
                        // endAdornment="style"
                    />
                </Grid>
                <Grid item xs={12} md={4} style={{width: '100%'}}>
                    <RadiusButton
                        loading={loadingStatus}
                        onClick = {searchHandler}
                        className={classes.button} fullWidth={true}>
                        <Typography variant='h6'>
                            Search
                        </Typography>
                    </RadiusButton>
                </Grid>
            </Grid>
        </div>
    );
}

export default SearchForm;