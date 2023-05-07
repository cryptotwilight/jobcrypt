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
var ierc20MetaDataContract;

var jcPaymentManagerAddress;
var jcJobCryptAddress;
var jcPostingFactoryAddress;
var jcDashboardFactoryAddress;
var openProductCoreAddress;
var ierc20MetaDataAddress;

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
var PROJECT_ID      = '2DvqZqHe2s15JtqZOP4fzlIDuUM';
var PROJECT_SECRET  = '4ea121e3cba982662a6ef048bb4a56a0';
var auth = Base64.encode(PROJECT_ID + ':' + PROJECT_SECRET);

var options = {}
options.apiUrl = 'https://ipfs.infura.io:5001';
options.headers = {};
options.headers.Authorization = "Basic " + auth; 

console.log(options);

const ipfs = window.IpfsHttpClientLite(options); 


const web3 = new Web3(window.ethereum);

console.log("web 3 " + web3.currentProvider);

const openRegisterAddress = "0xA26618eab14a8c54daa4ebd024DA97a1ba27CF35";
const openRegistryContract = new web3.eth.Contract(iOpenRegisterAbi, openRegisterAddress);

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
    configureCoreContracts()
    .then(function(response){
        loadWait();    
    })
    .catch(function(err){
        console.log(err);
    })
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

var loadCount = 0; 

function loadWait() { 
    console.log("load count :: " + loadCount);
    setTimeout(loadPageData, 3000);
    console.log("loadCount :: " + loadCount);
  
}   

async function configureCoreContracts() {
    console.log("registry contract");
    console.log(openRegistryContract);

    openRegistryContract.methods.getAddress("RESERVED_JOBCRYPT_PAYMENT_MANAGER").call({ from: account })
        .then(function(response) {
            console.log(response);
            jcPaymentManagerAddress = response;
            jcPaymentManagerContract = getContract(iJCPaymentManagerAbi, jcPaymentManagerAddress);
            loadCount++;
        })
        .catch(function(err) {
            console.log(err);
        });

    openRegistryContract.methods.getAddress("RESERVED_JOBCRYPT_CORE").call({ from: account })
        .then(function(response) {
            console.log(response);
            jcJobCryptAddress = response;
            jcJobCryptContract = getContract(iJCJobCryptAbi, jcJobCryptAddress);
            loadCount++;
        })
        .catch(function(err) {
            console.log(err);
        });
    openRegistryContract.methods.getAddress("RESERVED_JOBCRYPT_JOB_POSTING_FACTORY").call({ from: account })
        .then(function(response) {
            console.log(response);
            jcPostingFactoryAddress = response;
            jcPostingFactoryContract = getContract(iJCPostingFactoryAbi, jcPostingFactoryAddress);
            loadCount++;
        })
        .catch(function(err) {
            console.log(err);
        });
    openRegistryContract.methods.getAddress("RESERVED_JOBCRYPT_DASHBOARD_FACTORY").call({ from: account })
        .then(function(response) {
            console.log(response);
            jcDashboardFactoryAddress = response;
            jcDashboardFactoryContract = getContract(iJCDashboardFactoryAbi, jcDashboardFactoryAddress);
            loadCount++;
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
            loadCount++;
        })
        .catch(function(err) {
            console.log(err);
        });

    openRegistryContract.methods.getAddress("JOBCRYPT_STAKE_ERC20_CA").call({from : account})
    .then(function(response){
        console.log(response);
        ierc20MetaDataAddress = response; 
        ierc20MetaDataContract = new web3.eth.Contract(ierc20MetadataAbi, ierc20MetaDataAddress);
        initStakeValues();
        loadCount++;
    })
    .catch(function(err){
        console.log(err);
    });

}


const stakeApproveSpan = ge("stake_approve_span");
const stakeButtonSpan = ge("stake_button_span");
const stakeStatusSpan = ge("stake_status_span");  

var stakeCurrencyAddress; 
var stakeCurrencySymbol;
var minStakeAmount; 
var stakeCurrencySymbol;


async function initStakeValues() { 
    getStakeErc20Currency();
    getStakeCurrencySymbol();
    getMinStakeAmount();
     
}

async function getStakeStatus() { 
    jcJobCryptContract.methods.isStaked().call({from : account})
    .then(function(response){
        console.log("checking stake");
        console.log(response);
        var staked = response; 
        if(staked === true) {                    
            stakeButtonSpan.innerHTML = "<small><a type=\"submit\" id=\"stake_button\" onclick=\"unstake()\" class=\"ui-component-button ui-component-button-small ui-component-button-primary \">Un-stake</a></small></span>";                    
            getStakedAmount(stakeStatusSpan); 
            stakeApproveSpan.innerHTML = "";
        }
        else{
            stakeButtonSpan.innerHTML = "<small><a type=\"submit\" id=\"stake_button\" onclick=\"stake()\" class=\"ui-component-button ui-component-button-small ui-component-button-secondary \">Stake</a></small></span>"; 
            stakeStatusSpan.innerHTML = "<b><i class=\"fa fa-thumbs-down\"></i> NOT STAKED - To Apply for jobs, please Stake :: "+formatCurrency(minStakeAmount)+" "+stakeCurrencySymbol+ "</b>";
            stakeApproveSpan.innerHTML = "<small><a type=\"submit\" id=\"stake_approve_button\" onclick=\"approveStake()\" class=\"ui-component-button ui-component-button-small ui-component-button-primary \">Approve "+formatCurrency(minStakeAmount)+" "+stakeCurrencySymbol+ "</a></small>";
        }
    })
    .catch(function(err){
        console.log(err);

    });
}

async function getStakedAmount(span) {
    jcPaymentManagerContract.methods.getStakedAmount().call({from : account})
    .then(function(response){
        console.log(response);
        stakeStatusSpan.innerHTML = "<b><i class=\"fa fa-thumbs-up\"></i> STAKED ("+formatCurrency(response)+" "+stakeCurrencySymbol+") </b>";
    })
    .catch(function(err){
        console.log(err);
    });
}

async function getMinStakeAmount() { 
    jcPaymentManagerContract.methods.getMinimumStakeAmount().call({from : account})
    .then(function(response){
        console.log(response);
        minStakeAmount = response; 
        getStakeStatus();
    })
    .catch(function(err){
        console.log(err);
    });
}

async function getStakeErc20Currency(){
    jcPaymentManagerContract.methods.getStakeErc20Address().call({from : account}) 
    .then(function(response) {
        console.log(response);
        stakeCurrencyAddress = response; 
    })
    .catch(function(err){
        console.log(err);
    });
}

async function getStakeCurrencySymbol() {
   
   ierc20MetaDataContract.methods.symbol().call({from : account})
   .then(function(response){
        console.log(response);
        stakeCurrencySymbol = response;                
   })
   .catch(function(err){
        console.log(err);
   });
}

async function approveStake() { 
    
    ierc20MetaDataContract.methods.approve(jcPaymentManagerAddress, minStakeAmount).send({from : account})
    .then(function(response){
         console.log(response);
         var stakeSpanButton = ge("stake_button");
         stakeSpanButton.disabled = false; 
         var approveStakeButton = ge("stake_approve_button");
         approveStakeButton.disabled = true; 
    })
    .catch(function(err){
         console.log(err);
    });

}

async function stake(){
    jcPaymentManagerContract.methods.stake(minStakeAmount).send({from : account})
    .then(function(response){
        console.log(response);
        stakeStatusSpan.innerHTML = "<small style=\"color:green\"> STAKED :: "+formatCurrency(response)+"</small>"; 
        getStakeStatus();                
    })
    .catch(function(err){
        console.log(err);
    });
}

async function unstake() { 
    jcPaymentManagerContract.methods.unstake().send({from : account})
    .then(function(response){
        console.log(response);
        stakeStatusSpan.innerHTML = "<small style=\"color:orange\"> UNSTAKED :: "+formatCurrency(response)+"</small>";
        getStakeStatus();
    })
    .catch(function(err){
        console.log(err);
    });
}

function ge(element){
    return document.getElementById(element);
}



function formatCurrency(number) {
    return number / 1e18; 
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