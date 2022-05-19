export {};
// import React from 'react';
// import { themeCreator } from './base';

// export const ThemeContext = React.createContext(
//     (themeName: string): void => {},
// );

// const ThemeProviderWrapper: React.FC = props => {
//     const curThemeName =
//         localStorage.getItem('appTheme') || 'NebulaFighterTheme';
//     const [themeName, _setThemeName] = useState(curThemeName);
//     const theme = themeCreator('NebulaFighterTheme');
//     const setThemeName = (themeName: string): void => {
//         localStorage.setItem('appTheme', themeName);
//         _setThemeName(themeName);
//     };
//     return (
//         // <StylesProvider injectFirst>
//         <ThemeContext.Provider value={setThemeName}>
//             {/* <ThemeProvider theme={theme}>{props.children}</ThemeProvider > */}
//         </ThemeContext.Provider>
//         // </StylesProvider>
//     );
// };

// export default ThemeProviderWrapper;
