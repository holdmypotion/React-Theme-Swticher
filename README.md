In this article, we'll be creating a theme switcher using styled-components, context API, and of course, react.

Live Example: [https://codesandbox.io/s/react-theme-swticher-hbgjc](https://codesandbox.io/s/react-theme-swticher-hbgjc)

Github Repository: [https://github.com/holdmypotion/React-Theme-Swticher](https://github.com/holdmypotion/React-Theme-Swticher)

# Setup

Run the following commands to initiate a react app.

```css
npx create-react-app theme-switcher
cd theme-switcher
yarn add styled-components styled-normalize
```

Thus, you have a react app powered by styled-components.

Now, In the src folder create

1. a components folder and then a Layout.js file within.
2. a context folder and then a globalContext.js file within
3. a pages folder and then a Home.js file within
4. a styles folder and then a globalStyles.js file ad a homeStyles.js file.

The end structure should look something like this.

![Component tree structure](https://dev-to-uploads.s3.amazonaws.com/i/3vwh06t5jmyg1qlhufn8.png)

# Creating a context for current theme state

Inside the globalContext.js file, paste the below code.

```jsx
//globalContext.js

import React, { useState } from "react";

export const GlobalContext = React.createContext({
  currentTheme: "",
  themeSwitchHandler: () => {},
});

const GlobalContextProvider = (props) => {
  const [currentTheme, setCurrentTheme] = useState(
    window.localStorage.getItem("theme") == null
      ? "light"
      : window.localStorage.getItem("theme")
  );

  const themeSwitchHandler = (themeType) => {
    setCurrentTheme(themeType);
  };

  return (
    <GlobalContext.Provider
      value={{
        theme: currentTheme,
        themeSwitchHandler: themeSwitchHandler,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
```

The code above creates a context with a state and state changing function.

In the end, properties mentioned in the value prop will be available to the components using the useContext() hook.

```jsx
value={{
	theme: currentTheme,
	themeSwitchHandler: themeSwitchHandler,
}}
```

Using the Context:
Paste the code below into the index.js file.

```jsx
// index.js

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import GlobalContextProvider from "./context/globalContext";

ReactDOM.render(
  <React.StrictMode>
		{/* Wrap the App component with the GlobalContextProvider
				created in the previous code snippet */}
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

# Setting up a Layout Wrapper for pages

Paste the code below in the "src/components/Layout.js" file.

```jsx
// Layout.js

import React, { useContext } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { normalize } from "styled-normalize";

import { GlobalContext } from "../context/globalContext";

// 1.
const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    text-decoration: none;
  }

  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
  }

  body {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;;
    background: ${(props) => props.theme.background};
  }
`;

// 2.
const Layout = ({ children }) => {
  const darkTheme = {
    background: "#111827",
    secondaryBackground: "#374151",
    text: "#F9FAFB",
    button: "#E5E7EB",
  };

  const lightTheme = {
    background: "#F9FAFB",
    secondaryBackground: "#E5E7EB",
    text: "#111827",
    button: "#374151",
  };

	// 3.
  const currentTheme = useContext(GlobalContext);

	// 4.
  let theme;
  switch (currentTheme.theme) {
    case "dark":
      theme = darkTheme;
      break;
    case "light":
      theme = lightTheme;
      break;
    default:
      theme = lightTheme;
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <main>{children}</main>
    </ThemeProvider>
  );
};

export default Layout;
```

Let's break it down

1. The GlobalStyle constant defines the base styles that are generally defined in index.css file.
2. The Layout component has two constants, darkTheme and lightTheme and we'll be creating a toggle button to switch between the two. Using the same strategy, you can create as many themes as you would like.
3. Next we are fetching the currentTheme from the globalContext.
4. The switch case statement populates the "theme" variable which is later passed into the ThemeProvider component provided by styled-components.

# Creating the styles for the home page

I like to divide my styled-components on the basis of pages. As some of the styles are common among the pages, I also create a globalStyles.js file to define those.

```jsx
// globalStyles.js

import styled, { css } from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 32px;
  width: auto;
  height: 100%;

  ${(props) =>
    props.fluid &&
    css`
      padding: 0;
      margin: 0;
      max-width: 100%;
    `}
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  ${(props) =>
    props.center &&
    css`
      justify-content: center;
    `};
  ${(props) =>
    props.column &&
    css`
      flex-direction: column;
    `}
`;
```

Page-specific styles

```jsx
// homestyles.js

import styled from "styled-components";

export const NavBar = styled.div`
  background-color: ${(props) => props.theme.secondaryBackground};
  padding: 20px 0;
`;

export const SwitchButton = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.button};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
  }

  span:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: ${(props) => props.theme.secondaryBackground};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + span {
    background-color: ${(props) => props.theme.button};
  }

  input:focus + span {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + span:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

export const Body = styled.div`
  padding: 3em 5em;
`;

export const Heading = styled.div`
  font-size: 5em;
  font-weight: 800;
  color: ${(props) => props.theme.text};
`;

export const SubPara = styled.p`
  font-size: 1.5em;
  color: ${(props) => props.theme.text};
`;

export const Para = styled.p`
  font-size: 1.2em;
  line-height: 1.5;
  color: ${(props) => props.theme.text};
  width: 80%;
`;

export const Content = styled.div`
  padding: 10em 0;
`;
```

Now that we are done creating our little styled-components. It is time to use them to create the final page

# Home Page

Paste the code below in "src/components/Home.js" file

```jsx
// Home.js

import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/globalContext";

import Layout from "../components/Layout";
import { Container, Flex } from "../styles/globalStyles";
import {
  NavBar,
  SwitchButton,
  Body,
  Heading,
  SubPara,
  Para,
  Content,
} from "../styles/homeStyles";
const Home = () => {
	
	// 1.
  const { theme, themeSwitchHandler } = useContext(GlobalContext);

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Layout>
      <NavBar>
        <Container fluid>
          <Flex center>
						{/* 2. */}
            <SwtchButton>
              <input
                type='checkbox'
                onChange={() =>
                  themeSwitchHandler(theme === "dark" ? "light" : "dark")
                }
              />
              <span></span>
            </SwitchButton>
          </Flex>
        </Container>
      </NavBar>
      <Body>
        <Container>
          <Heading>Hello</Heading>
          <SubPara>
            What's up! Toggle the switch above to change the theme
          </SubPara>
          <Content>
            <Container>
              <Flex center column>
                <Heading>Article</Heading>
                <Para>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit quis ipsa, sunt, consectetur voluptate dolores
                  pariatur nisi distinctio iusto vero iure officia. Vero sunt,
                  ducimus sit eveniet dolor impedit itaque voluptate ipsam!
                  Omnis totam, beatae dicta fugit praesentium fugiat dolores
                  laborum, officiis, labore aperiam tempore! Debitis, provident!
                  Rem, exercitationem enim?
                </Para>
              </Flex>
            </Container>
          </Content>
        </Container>
      </Body>
    </Layout>
  );
};

export default Home;
```

Let's break it down:

1. We are fetching our context from the globalContext using the useContext() hook.
2. The "onChange" prop of the switch button toggles the theme between dark and light.
(A better way would be to create a separate button to call for different themes as we already have a switch-case statement to select the theme in the Layout.js file.)

Finally, import this component into the App.js file

```jsx
import Home from "./pages/Home";
function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
```

# Further Ideas

This method of using the ThemeProvider component to set themes is not just limited to colors, as it is clearly visible that you can define any kind of styles, store them into a constant, and then pass it on as a theme.

Be creative, think of some use cases where you can maybe pass different margins or padding or perhaps width. You could also pass different fonts, maybe create a website like [https://www.happyhues.co/](https://www.happyhues.co/)
This is super fun, so surely give it a try.

# Thank you so much for reading.

I would love to hear your views. Be sure to comment below!
