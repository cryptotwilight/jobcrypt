function buildResults() {

    const resultsTable = document.getElementById("results_table");

    for (var x = 0; x < 10; x++) {

        var postAddress = "0x00000000000";

        var row = resultsTable.insertRow();

        var companyCell = row.insertCell();
        var titleCell = row.insertCell();
        var locationCell = row.insertCell();
        var ageCell = row.insertCell();
        var applyLinkCell = row.insertCell();

        var companyText = document.createTextNode("company " + x);
        companyCell.appendChild(companyText);


        var titleText = document.createTextNode("job title " + x);
        titleCell.appendChild(titleText);


        var locationText = document.createTextNode("job location " + x);
        locationCell.appendChild(locationText);


        var ageText = document.createTextNode("6 days " + x);
        ageCell.appendChild(ageText);


        var jobDetailLinkDestination = "job_detail_template.html?postingAddress=" + postAddress;
        var applyLinkText = createLink(jobDetailLinkDestination, "details...");
        applyLinkCell.appendChild(applyLinkText);

    }

}