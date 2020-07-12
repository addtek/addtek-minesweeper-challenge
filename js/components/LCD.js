import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';


const MAX_LCD_VALUE = 999;
const digits = {
    d0: '0',
    d1: '1',
    d2: '2',
    d3: '3',
    d4: '4',
    d5: '5',
    d6: '6',
    d7: '7',
    d8: '8',
    d9: '9'
}

export default function LCD(props) {
    let d1,
        d2,
        d3,
        currentDigit,
        value = props.value;

    if (value > MAX_LCD_VALUE) {
        d1 = d2 = d3 = 'd9';
    }
    else if (value < 0) {
        d1 = d2 = d3 = 'd0';
    } 
    else {
        currentDigit = Math.floor(value / 100);
        d1 = `d${currentDigit}`;

        value -= currentDigit * 100;
        currentDigit = Math.floor(value / 10);
        d2 = `d${currentDigit}`;

        value -= currentDigit * 10;
        d3 = `d${value}`;
    }

    return <View style={styles.lcd}>
        <Text style={styles.digit} fadeDuration={0} children={digits[d1]} />
        <Text style={styles.digit} fadeDuration={0} children={digits[d2]} />
        <Text style={styles.digit} fadeDuration={0} children={digits[d3]} />
    </View>
}

LCD.propTypes = {
    value: PropTypes.number
}

const styles = StyleSheet.create({
    lcd: {
        backgroundColor: '#000',
        width: 70,
        height: 40,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderStyle: 'solid',
        alignItems:'center',
        borderLeftColor: '#808080',
        borderTopColor: '#808080',
        borderRightColor: '#fff',
        borderBottomColor: '#fff',
        padding: 2
    },
    digit: {
        width: 20,
        flex: 0,
        color:'red',
        textAlign:'center'
    },
});