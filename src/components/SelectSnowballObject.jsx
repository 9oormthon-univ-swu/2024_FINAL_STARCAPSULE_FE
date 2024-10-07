import { ObjectNames } from '@/constants/ObjectNames';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import ObjectInSnowball from './ObjectInSnowball';

const SelectSnowballObject = ({ snowballObject, setSnowballObject, mine }) => {
    const myObjects = [
        ObjectNames.CHRISTMAS_TREE,
        ObjectNames.GINGERBREAD_HOUSE,
        ObjectNames.LAMPLIGHT,
        ObjectNames.SANTA_SLEIGH,
    ];
    const friendsObject = [
        ObjectNames.MOON,
        ObjectNames.SANTA,
        ObjectNames.SNOWFLAKE,
        ObjectNames.SNOWMAN,
    ];

    const selectButtons = (object) => (
        <ToggleButton
            value={object}
            key={object}
            sx={{
                padding: '0',
                backgroundColor: 'transparent !important',
            }}
        >
            <ObjectInSnowball
                variant={object}
                selected={object == snowballObject}
            />
        </ToggleButton>
    );

    const handleChange = (event, newObject) => {
        setSnowballObject(newObject);
    };

    return (
        <ToggleButtonGroup
            onChange={handleChange}
            value={snowballObject}
            exclusive
            fullWidth
            sx={{
                '& .MuiToggleButtonGroup-grouped': {
                    // backgroundColor: 'transparent !important',
                    border: 'none',
                },
            }}
        >
            {mine
                ? myObjects.map(selectButtons)
                : friendsObject.map(selectButtons)}
        </ToggleButtonGroup>
    );
};

export default SelectSnowballObject;
