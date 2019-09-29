import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <EmojiEventsIcon />
            </ListItemIcon>
            <ListItemText primary="Liderboard" />
        </ListItem>
    </div>
);
