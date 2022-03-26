const popularJobsView = document.getElementById("popular_jobs_table");

async function getPopularJobs() { 
	jcJobCryptContract.methods.getPopularJobs().call({ from: account })
	.then(function(response) {
		console.log(response);
		var jobAddresses = response;		
		buildPopularJobs(jobAddresses, popularJobsView);				
	})
	.catch(function(err){
		console.log(err);
	});
}


function buildPopularJobs() {
    const popularJobsTable = document.getElementById("popular_jobs_table");

    for (var x = 0; x < 10; x++) {

        var popularTitle = "testTitle" + x;
        var linkDestination = "pages/app/job_search_results.html?search=" + popularTitle;
        var link = createLink(linkDestination, popularTitle);

        var row = popularJobsTable.insertRow();
        var cell = row.insertCell();

        link.setAttribute("style", "color: rgb(230, 59, 144);");
        cell.appendChild(link);
    }
}