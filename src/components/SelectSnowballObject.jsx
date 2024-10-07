import { ObjectNames } from '@/constants/ObjectNames';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import christmas_tree from '@/assets/object/christmas_tree.svg';
import gingerbread_house from '@/assets/object/gingerbread_house.svg';
import lamplight from '@/assets/object/lamplight.svg';
import moon from '@/assets/object/moon.svg';
import santa_sleigh from '@/assets/object/santa_sleigh.svg';
import santa from '@/assets/object/santa.svg';
import snowman from '@/assets/object/snowman.svg';
import snowflake from '@/assets/object/snowflake.svg';

// 임시 코드입니다. 이후 스노우볼이 들어간 오브젝트로 변경 필요
const SnowballObjects = {
    christmas_tree: christmas_tree,
    gingerbread_house: gingerbread_house,
    lamplight: lamplight,
    moon: moon,
    santa_sleigh: santa_sleigh,
    santa: santa,
    snowman: snowman,
    snowflake: snowflake,
};

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
        <ToggleButton value={object}>
            <img src={SnowballObjects[object]} alt={`${object} 모양`} />
        </ToggleButton>
    );

    const handleChange = (event, newObject) => {
        setSnowballObject(newObject);
    };

    return (
        <ToggleButtonGroup onChange={handleChange} value={snowballObject}>
            {mine
                ? myObjects.map(selectButtons)
                : friendsObject.map(selectButtons)}
        </ToggleButtonGroup>
    );
};

export default SelectSnowballObject;
