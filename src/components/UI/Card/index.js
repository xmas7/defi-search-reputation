import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';
import { yellow, green } from '@material-ui/core/colors';
import { SportsRugbySharp } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
    root: {
        height: '30%',
        width:'30%',
        borderRadius: 20,
    },
    card: {
      maxWidth: 500,
      width: '80%',
      height:150,
      margin: 10,
      borderRadius: 20,
      backgroundColor: "rgb(39 38 44/ 80%)" ,
      transition: "0.3s",
      boxShadow: "-2px -1px 14px 3px rgb(181 209 185 / 30%)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.2)"
      }
    },content: {
      textAlign: "left",
      padding: 10
    },
    divider: {
      margin: `${10}px 0`
    },
    heading: {
      fontWeight: "bold"
    },
    subheading: {
      lineHeight: 1.8
    },
    avatar: {
      display: "inline-block",
      border: "2px solid white",
      "&:not(:first-of-type)": {
        marginLeft: 10
      }
    },  
    dBlock: {
      display: 'block',
    }
}));

/**
 * component to display the Card
 * 
 * @param {Object} props
 */
const CustomizeCard = props => {
  // const { src, alt, lazy, ...rest } = props;

  const classes = useStyles();
    return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography
          className={"MuiTypography--heading"}
          variant={"h5"}
          gutterBottom
        >
          UniSwap Pool
        </Typography>
        <Typography
          className={"MuiTypography--subheading"}
          variant={"h6"}
        >
         contract-000003sx432r23
        </Typography>
        <Divider className={classes.divider} light />
          $80000USDT
       </CardContent>
    </Card>
    )
}

export default CustomizeCard;

