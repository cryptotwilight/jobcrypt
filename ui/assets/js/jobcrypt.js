console.log("loading core js");
/** standard elements  */
const onboardButton = document.getElementById("connect_web_3");
const showWallet = document.getElementById("showAccount");

const jcstorage = window.sessionStorage;

var account;

var jcPaymentManagerContract;
var jcJobCryptContract;
var jcPostingFactoryContract;
var jcDashboardFactoryContract;
var openProductCoreContract;

var jcPaymentManagerAddress;
var jcJobCryptAddress;
var jcPostingFactoryAddress;
var jcDashboardFactoryAddress;
var openProductCoreAddress;


const web3 = new Web3(window.ethereum);

const openRegisterAddress = "0x72fB0A0C17c15adff2422c89C732AE74c1c15862";
const openRegistryContract = new web3.eth.Contract(iOpenRegisterAbi, openRegisterAddress);

const ipfs = window.IpfsHttpClientLite('https://ipfs.infura.io:5001')
const buffer = window.IpfsHttpClientLite.Buffer;
console.log("got ipfs: " + ipfs);

//Created check function to see if the MetaMask extension is installed
const isMetaMaskInstalled = () => {

    const {
        ethereum
    } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
};

const MetaMaskClientCheck = () => {
    //Now we check to see if Metmask is installed
    if (!isMetaMaskInstalled()) {
        console.log("metamask not installed");
        //If it isn't installed we ask the user to click to install it
        onboardButton.innerText = 'Click here to install MetaMask!';
        //When the button is clicked we call this function
        onboardButton.onclick = onClickInstall;
        //The button is now disabled
        onboardButton.disabled = false;
    } else {
        //If it is installed we change our button text
        onboardButton.innerText = 'Click to Connect Metamask';

        console.log("metamask installed");
        onboardButton.addEventListener('click', () => {
            getAccount();
            onboardButton.innerText = "Web 3 Connected";
        });
    }
};
const initialize = () => {
    MetaMaskClientCheck();
};

window.addEventListener('DOMContentLoaded', initialize);

async function getAccount() {
    const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
    });
    account = accounts[0];
    showWallet.innerHTML = "<b>Connected Wallet :: " + account + "</b>";
    configureCoreContracts();
}

//We create a new MetaMask onboarding object to use in our app
//const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

//This will start the onboarding proccess
const onClickInstall = () => {
    onboardButton.innerText = 'Onboarding in progress';
    onboardButton.disabled = true;
    //On this object we have startOnboarding which will start the onboarding process for our end user
    onboarding.startOnboarding();
};

const onClickConnect = async() => {
    try {
        // Will open the MetaMask UI
        // You should disable this button while the request is pending!
        await ethereum.request({
            method: 'eth_requestAccounts'
        });
    } catch (error) {
        console.error(error);
    }
};

async function configureCoreContracts() {
    console.log("registry contract");
    console.log(openRegistryContract);

    openRegistryContract.methods.getAddress("RESERVED_JOBCRYPT_PAYMENT_MANAGER").call({ from: account })
        .then(function(response) {
            console.log(response);
            jcPaymentManagerAddress = response;
            jcPaymentManagerContract = getContract(iJCPaymentManagerAbi, jcPaymentManagerAddress);
        })
        .catch(function(err) {
            console.log(err);
        });

    openRegistryContract.methods.getAddress("RESERVED_JOBCRYPT_CORE").call({ from: account })
        .then(function(response) {
            console.log(response);
            jcJobCryptAddress = response;
            jcJobCryptContract = getContract(iJCJobCryptAbi, jcJobCryptAddress);
        })
        .catch(function(err) {
            console.log(err);
        });
    openRegistryContract.methods.getAddress("RESERVED_JOBCRYPT_JOB_POSTING_FACTORY").call({ from: account })
        .then(function(response) {
            console.log(response);
            jcPostingFactoryAddress = response;
            jcPostingFactoryContract = getContract(iJCPostingFactoryAbi, jcPostingFactoryAddress);
        })
        .catch(function(err) {
            console.log(err);
        });
    openRegistryContract.methods.getAddress("RESERVED_JOBCRYPT_DASHBOARD_FACTORY").call({ from: account })
        .then(function(response) {
            console.log(response);
            jcDashboardFactoryAddress = response;
            jcDashboardFactoryContract = getContract(iJCJobSeekerDashboard, jcDashboardFactoryAddress);
        })
        .catch(function(err) {
            console.log(err);
        });

    openRegistryContract.methods.getAddress("RESERVED_OPEN_PRODUCT_CORE").call({ from: account })
        .then(function(response) {
            console.log(response);
            openProductCoreAddress = response;
            openProductCoreContract = getContract(iOpenProductCoreAbi, openProductCoreAddress);
            console.log(openProductCoreContract);
            loadPageData();
        })
        .catch(function(err) {
            console.log(err);
        });

}

function getContract(abi, address) {
    return new web3.eth.Contract(abi, address);
}


function formatDate(date) {
    return date.toLocaleString('en-UK', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute: '2-digit', second: '2-digit' })
}


function encryptJSON(data) {
    // Encrypt
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
    return encrypted;
}

function decryptJSON(data) {
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(data, 'secret key 123');
    var decrypted = SON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decrypted;
}


function getSeparatedList(list) {
    var separatedValues = "";
    var split = list.split(" ");
    for (var x = 0; x < split.length; x++) {
        separatedValues += split[x] + " | ";
    }
    return separatedValues;
}

function getTimeSincePosting(dateSeconds) {
    return "6 hours";
}

function createTextButton(functionDestination, buttonText) {
    var link = document.createElement("a");
    link.setAttribute("onclick", functionDestination);
    link.setAttribute("style", "color: rgb(18, 22, 236);");
    var bt = document.createTextNode(buttonText);
    link.appendChild(bt);
    return link
}

function createLink(linkDestination, linkText) {
    var link = document.createElement("a");
    link.setAttribute("href", linkDestination);
    linkText = document.createTextNode(linkText);
    link.appendChild(linkText);
    return link;
}

function getTextNode(str) {
    return document.createTextNode(str);
}

function clearSelect(select) {
    var len = select.childNodes.length;
    for (var x = 0; x < len; x++) {
        select.remove(0);
    }
}

function clearTableNoHeader(table) {
    var len = table.childNodes.length; 
    for (var x = 0; x < len; x++) {
        table.remove(0);
    }

}