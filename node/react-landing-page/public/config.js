
const config = {

    appId: "securedesignservices",

    appName: "Studio in the Cloud",

    useKeycloak: true,

    useEphemeralStorage: false,

    keycloakAuthUrl: "https://keycloak.securedesignservices.com",

    keycloakRealm: "contractmanagement",

    keycloakClientId: "sds",

    serviceUrl: "https://service.securedesignservices.com",

    appDefinition: "secureworking",

    availableContainers: [
        "codasip-tools-9-4-2",
        "codasip-tools-9-4-4",
        "scala-2-1-3",
        "lockular-scala-0-0-1"],
    changePasswordUrl:
    "https://keycloak.securedesignservices.com/realms/contractmanagement/protocol/openid-connect/auth?response_type=code&client_id=sds&redirect_uri=https://securedesignservices.lockular.io&kc_action=UPDATE_PASSWORD",

    logoutUrl:
    "https://keycloak.securedesignservices.com/realms/contractmanagement/protocol/openid-connect/logout?redirect_uri=https://securedesignservices.lockular.io",

    keycloakadminusername:   "admin@lockular.in",

    keycloakadminpassword:   "lockular@2023",

    keycloakadminsecret:  "4XcXl8X6L1fzOtp6nOthKLuDzGNMgjx7"

    };


    export default config;
