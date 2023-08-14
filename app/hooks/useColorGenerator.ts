import * as React from 'react';

export type ColorPair = {
    background: string,
    text: string
}

const useColorGenerator = () => {

    const [generatedColors, setGeneratedColors] = React.useState<ColorPair>()

    const colorGenerator = React.useCallback(function (): ColorPair {

        if (generatedColors) {
            return generatedColors;
        } else {

            // get random numbers from 0 - 20 and multiply by 18 to give a random hue;
            const hue = Math.floor(Math.random() * 21) * 18;

            const backgroundColor = `hsl(${hue}, 100%, 50%)`;
            const textColor = (hue > 130 && hue < 180) || (hue > 31 && hue < 115) ? 'black' : 'white';

            const values = {
                background: backgroundColor,
                text: textColor,
            };

            setGeneratedColors(values)

            return values;
        }

    }, [generatedColors]);

    return colorGenerator;
}

export default useColorGenerator;
