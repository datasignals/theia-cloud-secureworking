import { LaunchRequest, RequestOptions, TheiaCloud } from "@lockular/common/src";
import Keycloak from 'keycloak-js';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import config from '../public/config.js';
import Footer from './components/Footer';
import Header from './components/Header';
import { usePreviousContainer } from './context/containerContext';
import { userData } from './userData';
import About from "./views/About.js";
import Contact from "./views/Contact.js";
import Register from './views/Register';
import Loading from './views/SessionLauncher.js';
import Terms from './views/Terms';
import WelcomeBack from './views/WelcomeBack';

function App() {
  const { setPreviousContainer } = usePreviousContainer();


  async function getPreviousContainer() {
    const retries = 1;
    const newAppDefinition = "";

    const launchRequest = LaunchRequest.createWorkspace(
      config.serviceUrl!,
      config.appId!,
      newAppDefinition,
      undefined,
      userData.email,
      userData.workspaceName
    );

    const options: RequestOptions = {
      accessToken: userData.token,
      retries,
      timeout: 300000
    };

    try {
      const workspaces = await TheiaCloud.Workspace.listWorkspaces({
        appId: launchRequest.appId,
        user: launchRequest.user,
        serviceUrl: launchRequest.serviceUrl,
      }, options);

      if (!workspaces[0] || !config.availableContainers[0]) {
        userData.selectedContainer=config.availableContainers[0];
        return "";
        
      }

      if (config.availableContainers?.find(a => (a as string) === workspaces[0]?.appDefinition)) {
        console.log("Found previous workspace");
        const previousContainer = workspaces[0].appDefinition!;
        setPreviousContainer(previousContainer);
        userData.selectedContainer=previousContainer;
        return previousContainer;
      } else {
        userData.selectedContainer=config.availableContainers[0];
        return "";
      }
    } catch (error) {
      console.error("Error fetching previous container:", error);
      userData.selectedContainer=config.availableContainers[0];
    }
  }

  useEffect(() => {
    const keycloakConfig = {
      url: config.keycloakAuthUrl,
      realm: config.keycloakRealm!,
      clientId: config.keycloakClientId!,
    };
    const keycloak = Keycloak(keycloakConfig);

    keycloak
      .init({
        onLoad: 'login-required',
        redirectUri: window.location.href,
        checkLoginIframe: false,
      })
      .then((auth) => {
        if (!auth) {
          window.location.reload();
        } else {
          const parsedToken = keycloak.idTokenParsed;
          if (parsedToken) {
            const userMail = parsedToken.email;
            userData.firstName = parsedToken.name;
            userData.email = userMail;
            if (keycloak.idToken !== undefined) {
              userData.token = keycloak.idToken;
            }
            userData.workspaceName =
              'ws-' + config.appId + '-' + config.appDefinition + '-' + userMail;

            // Call getPreviousContainer here
            getPreviousContainer();
          }
        }
      })
      .catch((error) => {
        console.error('Authentication Failed:', error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomeBack />} />
        <Route path="register" element={<Register />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="terms" element={<Terms />} />
        <Route path="loading" element={<Loading />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
