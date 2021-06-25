import {extendTheme} from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        body: "Inter"
    },
    colors: {
        brand: {
            100: '#ffffff',
            200: '#000000',
            300: '#FAF3EE',
            400: '#FD455A',
            500: '#ff6377',
            600: '#141723',
            700: 'rgba(250,243,238,0.7)',
            800: '#c3c3c3'
        }
    }
});

export default theme;