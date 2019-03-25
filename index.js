const base64 = require("base-64");
const pkgConfig = require("./package.json");
const vaultEndpoint = "https://vault.omise.co/";
const apiEndpoint = "https://api.omise.co/";

let _publicKey;
let _apiVersion;
let _secretKey;

/**
 * ReactNativeOmise
 */
class ReactNativeOmise {

    /**
     * constructor
     */
    constructor() {
        this.createSource = this.createSource.bind(this);
        this.createToken = this.createToken.bind(this);
        this.createCustomerWithCard = this.createCustomerWithCard.bind(this);
        this.createCharges = this.createCharges.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.attachCardToCustomer = this.attachCardToCustomer.bind(this);
    }

    /**
     * To set a public key and API version
     * @param {String} publicKey 
     * @param {String} secretKey 
     * @param {String} apiVersion 
     */
    config(publicKey, secretKey, apiVersion = "2015-11-17") {
        _publicKey = publicKey;
        _secretKey = secretKey;
        _apiVersion = apiVersion;
    }

    /**
     * Get headers
     * @return {*} headers
     */
    getHeaders(secret=false) {
        let key= secret?_secretKey: _publicKey
        let headers = {
                'Authorization': 'Basic ' + base64.encode(key + ":"),
                'User-Agent': pkgConfig.name + "/" + pkgConfig.version,
                'Content-Type': 'application/json',
            };
        

        if (_apiVersion && _apiVersion !== "") {
            headers['Omise-Version'] = _apiVersion;
        }

        return headers;
    }

    /**
     * Create a token
     * @param {*} data 
     */
    createToken(data) {
        const tokenEndpoint = vaultEndpoint + "tokens";
        // set headers
        let headers = this.getHeaders();

        return new Promise((resolve, reject) => {
            // verify a public key
            if (!_publicKey || _publicKey === "") {
                reject("Please config your public key");
                return;
            }

            return fetch(tokenEndpoint, {
                method: 'POST',
                cache: 'no-cache',
                headers: headers,
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok && response.status === 200) {
                    resolve(response.json());
                } else {
                    console.log("response not ok", response);
                    reject(response.json());
                }
            }).catch((error) => resolve(error));
        });
    }

    /**
     * Create a source
     * @param {*} data 
     */
    createSource(data) {
        const sourceEndpoint = apiEndpoint + "sources";
        // set headers
        let headers = this.getHeaders();

        return new Promise((resolve, reject) => {
            // verify a public key
            if (!_publicKey || _publicKey === "") {
                reject("Please config your public key");
                return;
            }

            return fetch(sourceEndpoint, {
                method: 'POST',
                cache: 'no-cache',
                headers: headers,
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok && response.status === 200) {
                    resolve(response.json());
                } else {
                    console.log("response not ok", response);
                    reject(response.json());
                }
            }).catch((error) => resolve(error));
        });
    }
    /**
     * Create a customer with a card
     * @param {*} data 
     */
    createCustomerWithCard(data) {
        const tokenEndpoint = apiEndpoint +"customers";
        // set headers
        let headers = this.getHeaders(true);

        return new Promise((resolve, reject) => {
            // verify a public key
            if (!_secretKey || _secretKey === "") {
                reject("Please config your public key");
                return;
            }

            return fetch(tokenEndpoint, {
                method: 'POST',
                cache: 'no-cache',
                headers: headers,
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok && response.status === 200) {
                    resolve(response.json());
                } else {
                    console.log("response not ok", response);
                    reject(response.json());
                }
            }).catch((error) => resolve(error));
        });
    }
     /**
     * Create a charge
     * @param {*} data 
     */
    createCharges(data) {
        const tokenEndpoint = apiEndpoint + "charges";
        // set headers
        let headers = this.getHeaders(true);

        return new Promise((resolve, reject) => {
            // verify a public key
            if (!_secretKey || _secretKey === "") {
                reject("Please config your public key");
                return;
            }

            return fetch(tokenEndpoint, {
                method: 'POST',
                cache: 'no-cache',
                headers: headers,
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok && response.status === 200) {
                    resolve(response.json());
                } else {
                    console.log("response not ok", response);
                    reject(response.json());
                }
            }).catch((error) => resolve(error));
        });
    }
     /**
     * Create a token
     * @param {*} CUSTOMER_ID
     * @param {*} data 
     */
    attachCardToCustomer(CUSTOMER_ID,data){
        const tokenEndpoint = apiEndpoint + "customers/"+CUSTOMER_ID;
        
        // set headers
        let headers = this.getHeaders(true);

        return new Promise((resolve, reject) => {
            // verify a public key
            if (!_secretKey || _secretKey === "") {
                reject("Please config your public key");
                return;
            }

            return fetch(tokenEndpoint, {
                method: 'PATCH',
                cache: 'no-cache',
                headers: headers,
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok && response.status === 200) {
                    resolve(response.json());
                } else {
                    console.log("response not ok", response);
                    reject(response.json());
                }
            }).catch((error) => resolve(error));
        });
    }
    /**
     * Update a card to a customer
     * @param {*} CUSTOMER_ID
     * @param {*} CARD_ID
     * @param {*} data 
     */
    updateCustomer(CUSTOMER_ID,  data){
        const tokenEndpoint = apiEndpoint + "customers/"+CUSTOMER_ID;
        
        // set headers
        let headers = this.getHeaders(true);

        return new Promise((resolve, reject) => {
            // verify a public key
            if (!_secretKey || _secretKey === "") {
                reject("Please config your public key");
                return;
            }

            return fetch(tokenEndpoint, {
                method: 'PATCH',
                cache: 'no-cache',
                headers: headers,
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok && response.status === 200) {
                    resolve(response.json());
                } else {
                    console.log("response not ok", response);
                    reject(response.json());
                }
            }).catch((error) => resolve(error));
        });
    }
}


const reactNativeOmise = new ReactNativeOmise();

module.exports = {
    config: reactNativeOmise.config,
    createToken: reactNativeOmise.createToken,
    createSource: reactNativeOmise.createSource,
    createCustomerWithCard: reactNativeOmise.createCustomerWithCard,
    createCharge: reactNativeOmise.createCharges,
    updateCustomer: reactNativeOmise.updateCustomer,
    attachCardToCustomer: reactNativeOmise.attachCardToCustomer
}