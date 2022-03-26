const createDraftPostingButton = document.getElementById("create_draft_job_posting");
createDraftPostingButton.addEventListener('click', createPosting);

const editDraftPostingButton = document.getElementById("edit_draft_posting_button");
editDraftPostingButton.addEventListener('click', editListing);

const saveDraftPostingButton = document.getElementById("save_draft_posting_button");
saveDraftPostingButton.addEventListener('click', saveJob);

const resetDraftPostingButton = document.getElementById("reset_draft_posting_button");
resetDraftPostingButton.addEventListener('click', editListing);

const approvePaymentCurrencyButton = document.getElementById("approve_payment_currency_button");
approvePaymentCurrencyButton.addEventListener('click', approveCurrency);

const buyJobPostingButton = document.getElementById("buy_job_posting_button");
buyJobPostingButton.addEventListener('click', buyPosting);

const postJobButton = document.getElementById("post_job_button");
postJobButton.addEventListener('click', postJobToJobCrypt);

const jobPostingCreateDisplay = document.getElementById("job_posting_create_display");

const jobPostingEdittDisplay = document.getElementById("job_posting_edit_display");

const jobPostingPaytDisplay = document.getElementById("job_posting_pay_display");

const jobPostingSaveDisplay = document.getElementById("job_posting_save_display");

const jobPostingPostDisplay = document.getElementById("job_posting_post_display");

const jobPostingProductSelect = document.getElementById("job_posting_product_select");

const jobPostingPaymentCurrencySelect = document.getElementById("job_posting_payment_currency_select");

const jobPostingDraftSelect = document.getElementById("edit_draft_job_posting_select");

const jobPostingDuration = document.getElementById("job_posting_duration_view");

const jobPostingFee = document.getElementById("job_posting_fee_view");

const jobPostingCurrency = document.getElementById("job_posting_currency_view");

const jobPostingCurrencyErc20Address = document.getElementById("job_posting_currency_erc20_address_view");

var selectedPostingAddress;
var selectedERC20Address;
var selectedPostingFee;

function loadPageData() {
    loadProducts();
    updateDraftListings();
}

async function loadProducts() {
    clearSelect(jobPostingProductSelect);
    console.log(openProductCoreContract);
    openProductCoreContract.methods.getProducts().call({from :account})
    .then(function(response){
        console.log(response);
        var productAddresses = response; 
        for(var x = 0; x < productAddresses.length; x++){ 
            var productAddress = productAddresses[x];
            populateProductSelect(productAddress, jobPostingProductSelect);
        }
    })
    .catch(function(err){
        console.log(err);
    })
}

function populateProductSelect(productAddress, jobPostingProductSelect){
    productContract = getContract(iOpenProductAbi, productAddress);

    productContract.methods.getName().call({from : account})
    .then(function(response){
        console.log(response);
        var name = response; 
        productContract.methods.getPrice().call({from : account})
        .then(function(response){
            console.log(response);
            var price = response; 
            productContract.methods.getCurrency().call({from : account})
            .then(function(response){
                console.log(response);
                var currency = response;
                var option = document.createElement("option");
                var optionTxt = name + " - " + price + "("+currency+")";
                var txt = document.createTextNode(optionTxt);
                option.appendChild(txt);
                option.setAttribute("value", productAddress);
                jobPostingProductSelect.appendChild(option);
            })
            .catch(function(err){
                console.log(err);
            });
        })
        .catch(function(err){
            console.log(err);
        });
    })
    .catch(function(err){
        console.log(err);
    });
}

async function createPosting() {
    var productAddress = jobPostingProductSelect.value; 
    console.log("product address :: "+ productAddress);

    jcPostingFactoryContract.methods.createJobPosting(account,productAddress ).send({ from: account })
    .then(function(response) {
        console.log(response);
        jobPostingCreateDisplay.innerHTML = "Draft Posting Created Txn :: " + response.blockHash;
        updateDraftListings();
    })
    .catch(function(err) {
        console.log(err);
    });
}

var t = new String("POSTED").valueOf();
var n = new String("CLOSED").valueOf();

async function updateDraftListings() {
    clearSelect(jobPostingDraftSelect);
    jcPostingFactoryContract.methods.findPostings(account).call({ from: account })
        .then(function(response) {
            console.log(response);
            var allPostings = response;
            for (var x = 0; x < allPostings.length; x++) {
                var postingAddress = allPostings[x];
                processDraftPosting(postingAddress);                
            }
        })
        .catch(function(err) {
            console.log(err);
        })
}

function processDraftPosting(postingAddress) {
    console.log(postingAddress);
    var postingContract = getContract(iJCJobPostingAbi, postingAddress);
    postingContract.methods.getPostingStatus().call({ from: account })
        .then(function(response) {
            console.log(response);
            var status = response;
            var v = status.valueOf();
            console.log(postingAddress);

            if (v != t && v != n) {
                addDraftPostingOption(postingContract, postingAddress, status);
            }
        })
        .catch(function(err) {
            console.log(err);
        })
}



var o = new String("").valueOf();

function addDraftPostingOption(postingContract, postingAddress, status) {
    var option = document.createElement("option");
    option.setAttribute("value", postingAddress);
    postingContract.methods.getFeature("JOB_TITLE").call({ from: account })
        .then(function(response) {
            console.log(response);
            var titleTxt = response;
            
            titleTxt = "Title :: "+ titleTxt + " :: status :: " + status +" :: "+ postingAddress ;
            var txt = document.createTextNode(titleTxt);
            option.appendChild(txt);
            jobPostingDraftSelect.appendChild(option);
        })
}

function editListing() {

    var postingAddress = jobPostingDraftSelect.value;
    jobPostingEdittDisplay.innerHTML = "Editing Draft :: " + postingAddress;
    selectedPostingAddress = postingAddress;
    var title = document.getElementById("job_title");
    var locationType = document.getElementById("job_location_type");
    var locationSupport = document.getElementById("job_location_support");
    var workLocation = document.getElementById("job_work_location");
    var companyName = document.getElementById("company_name");
    var companyLink = document.getElementById("company_link");
    var companySummary = document.getElementById("company_summary");
    var skillsRequired = document.getElementById("job_skills_required");
    var searchCategories = document.getElementById("job_search_categories");
    var workType = document.getElementById("job_work_type");
    var salaryPaymenttype = document.getElementById("job_payment_type");
    var jobDescription = document.getElementById("job_description");
    var jobApplicationlink = document.getElementById("job_application_link");

    postingContract = getContract(iJCJobPostingAbi, postingAddress);

    postingContract.methods.getFeature("JOB_TITLE").call({ from: account })
        .then(function(response) {
            console.log(response);
            title.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })

    postingContract.methods.getFeature("JOB_LOCATION_TYPE").call({ from: account })
        .then(function(response) {
            console.log(response);
            locationType.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })


    postingContract.methods.getFeature("JOB_LOCATION_SUPPORT").call({ from: account })
        .then(function(response) {
            console.log(response);
            locationSupport.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })


    postingContract.methods.getFeature("JOB_WORK_LOCATION").call({ from: account })
        .then(function(response) {
            console.log(response);
            workLocation.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })

    postingContract.methods.getFeature("COMPANY_NAME").call({ from: account })
        .then(function(response) {
            console.log(response);
            companyName.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })

        postingContract.methods.getFeature("COMPANY_LINK").call({ from: account })
        .then(function(response) {
            console.log(response);
            companyLink.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })

    postingContract.methods.getFeature("COMPANY_SUMMARY").call({ from: account })
        .then(function(response) {
            console.log(response);
            companySummary.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })

    postingContract.methods.getFeature("JOB_WORK_TYPE").call({ from: account })
        .then(function(response) {
            console.log(response);
            workType.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })

    postingContract.methods.getFeature("JOB_PAYMENT_TYPE").call({ from: account })
        .then(function(response) {
            console.log(response);
            salaryPaymenttype.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })

    postingContract.methods.getFeature("JOB_DESCRIPTION").call({ from: account })
        .then(function(response) {
            console.log(response);
            fetchFromIPFS(response, jobDescription);
        })
        .catch(function(err) {
            console.log(err);
        })

    /*
        postingContract.methods.getFeature("JOB_APPLICATION_LINK").call({from : account})
        .then(function(response){
            console.log(response);
            jobApplicationlink.value = response; 
        })
        .catch(function(err){
            console.log(err);
        })
    */

    postingContract.methods.getSkillsRequired().call({ from: account })
        .then(function(response) {
            console.log(response);
            skillsRequired.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })

    postingContract.methods.getCategories().call({ from: account })
        .then(function(response) {
            console.log(response);
            searchCategories.value = response;
        })
        .catch(function(err) {
            console.log(err);
        })

    postingContract.methods.getProduct().call({ from: account })
        .then(function(response) {
            console.log(response);
            var productAddress = response;
            updatePaymentBox(productAddress, postingAddress);
        })
        .catch(function(err) {
            console.log(err);
        })
}


function updatePaymentBox(productAddress, postingAddress) {
    console.log(postingAddress);
    var productContract = getContract(iOpenProductAbi, productAddress);
    console.log("product contract");
    console.log(productContract);
    productContract.methods.getFeatureUINTValue("DURATION").call({ from: account })
        .then(function(response) {
            console.log(response);
            var duration = response;
            var weeks = duration / (7 * 24 * 60 * 60);
            console.log(weeks);
            console.log(jobPostingDuration);
            jobPostingDuration.innerHTML = weeks + " Weeks ";
        })
        .catch(function(err) {
            console.log(err);
        });

    postingContract = getContract(iJCJobPostingAbi, postingAddress);
    postingContract.methods.getFee().call({ from: account })
        .then(function(response) {
            console.log(response);
            var fee = response._fee;
            var currency = response._erc20Currency;
            var erc20 = response._erc20Address;
            jobPostingFee.innerHTML = fee;
            jobPostingCurrency.innerHTML = currency;
            jobPostingCurrencyErc20Address.innerHTML = erc20;

            selectedPostingAddress = postingAddress;
            selectedERC20Address = erc20;
            selectedPostingFee = fee;
        })
        .catch(function(err) {
            console.log(err);
        })

}

async function approveCurrency() {

    var erc20Address = jobPostingCurrencyErc20Address.value;
    var approvalAmount = tokenAmountField.value;
    var erc20Contract = getContract(iERC20Abi, erc20Address);
    erc20Contract.methods.approve(account, approvalAmount)
        .then(function(response) {
            console.log(response);
            jobPostingPaytDisplay.innerHTML = "Approved : " + response.hash;
        })
        .catch(function(err) {
            console.log(err);
        })
}

async function buyPosting() {

    if (selectedERC20Address == 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE) {
        jcPaymentManagerContract.methods.payForPosting(selectedPostingAddress).send({ from: account, value: selectedPostingFee })
            .then(function(response) {
                console.log(response);
                jobPostingPaytDisplay.innerHTML = "Paid :: " + response.blockHash;
            })
            .catch(function(err) {
                console.log(err);
                jobPostingPaytDisplay.innerHTML = "Payment Error :: " + err;
            })
    } else {
        jcPaymentManagerContract.methods.payForPosting(selectedPostingAddress).send({ from: account })
            .then(function(response) {
                console.log(response);
                jobPostingPaytDisplay.innerHTML = "Paid :: " + response.blockHash;
            })
            .catch(function(err) {
                console.log(err);
                jobPostingPaytDisplay.innerHTML = "Payment Error :: " + err;
            })
    }
}

async function saveJob() {
    jobJSON = getJobToPost();
    var hash;
    await ipfs.add(jobJSON.description)
        .then(function(response) {
            console.log(response);
            hash = response[0].hash;
            console.log(hash);
            saveToEVM(jobJSON, hash);
        })
        .catch(function(err) {
            console.log(err);
        });
}

async function saveToEVM(jobJSON, hash) {
    var featureNames = ["JOB_TITLE", "JOB_LOCATION_TYPE", "JOB_LOCATION_SUPPORT", "JOB_WORK_LOCATION", "COMPANY_NAME", "COMPANY_LINK", "COMPANY_SUMMARY", "JOB_WORK_TYPE", "JOB_PAYMENT_TYPE", "JOB_DESCRIPTION"];
    var featureValues = [jobJSON.jobTitle+"", jobJSON.locationType+"", jobJSON.locationSupport+"", jobJSON.workLocation+"", jobJSON.companyName+"", jobJSON.companyLink, jobJSON.companySummary+"", jobJSON.workType+"", jobJSON.paymentType+"", hash+""];
    console.log(featureNames);
    console.log(featureValues);
    var postingEditorContract = getContract(iJCJobPostingEditorAbi, selectedPostingAddress);

    postingEditorContract.methods.populatePosting(featureNames, featureValues, jobJSON.searchCategories, jobJSON.skillsRequired, jobJSON.applicationLink).send({ from: account })
            .then(function(response) {
                console.log(response);
                jobPostingSaveDisplay.innerHTML = "Saved @> EVM :: " + response.blockHash + " :: IPFS :: " + hash;
            })
            .catch(function(err) {
                console.log(err);

            });
}

function getJobToPost() {
        var jobTitle = document.getElementById("job_title");
        console.log("jt: " + jobTitle);
        var locationType = document.getElementById("job_location_type");

        var locationSupport = document.getElementById("job_location_support");
        var workLocation = document.getElementById("job_work_location");
        var companyName = document.getElementById("company_name");
        var companyLink = document.getElementById("company_link");
        var companySummary = document.getElementById("company_summary");
        var skillsRequired = document.getElementById("job_skills_required");
        var searchCategories = document.getElementById("job_search_categories");
        var workType = document.getElementById("job_work_type");
        var paymentType = document.getElementById("job_payment_type");
        var description = document.getElementById("job_description");
        console.log(" jd : " + description);

        var applicationLink = document.getElementById("job_application_link");

        var jString = "{ \"jobTitle\" : \"" + jobTitle.value + "\"," +
        "\"locationType\" : \"" + locationType.value + "\"," +
        "\"locationSupport\" : \"" + locationSupport.value + "\"," +
        "\"workLocation\" : \"" + workLocation.value + "\"," +
        "\"companyName\" : \"" + companyName.value + "\"," +
        "\"companyLink\" : \"" + companyLink.value + "\"," +
        "\"companySummary\" : \"" + companySummary.value + "\"," +
        "\"skillsRequired\" : [" + toJSONStringArray(skillsRequired.value) + "]," +
        "\"searchCategories\" : [" + toJSONStringArray(searchCategories.value) + "]," +
        "\"workType\" : \"" + workType.value + "\"," +
        "\"paymentType\" : \"" + paymentType.value + "\"," +
        "\"description\" : \"" + description.value + "\"," +
        "\"applicationLink\" : \"" + applicationLink.value + "\"}"; 
        console.log(jString);
        var jobJSON = JSON.parse(jString);
        return jobJSON;
}

function toJSONStringArray(str) {
    var a = str.split(",");
    var b = ""; 
    for(var x = 0; x < a.length; x++){
        b += "\""+a[x]+"\"";
        if(x != a.length-1){
            b+=",";
        }
    }
    return b;
}
    
function postJobToJobCrypt() {
    console.log("posting job");
    saveJob();
    console.log("posting");
    console.log(jcJobCryptContract);
    console.log(selectedPostingAddress);
    var postingEditorContract = getContract(iJCJobPostingEditorAbi, selectedPostingAddress);
    postingEditorContract.methods.post().send({ from: account })
        .then(function(response) {
            console.log(response);
            jobPostingPostDisplay.innerHTML = " Job : " + selectedPostingAddress + " :: POSTED :: " + response.blockHash;
        })
        .catch(function(err) {
            console.log(err);
        });
}


async function fetchFromIPFS(cid, messageSpan) {
    url = "https://ipfs.io/ipfs/" + cid;
    console.log(" url: " + url);
    let response = await fetch(url)
        .then(function(response) {
            return response.text();
        })
        .then(function(text) {
            messageSpan.innerHTML = text;
        });
}

