window.addEventListener("load", function(e) {
	console.log("script.js loaded");
	init();
});

function init() {
	document.listAllForm.listAllRides.addEventListener("click", function(e) {
		e.preventDefault();
		loadTracker();
	});
	document.createRide.addRide.addEventListener("click", function(e){
		e.preventDefault();
		let fm = document.createRide;
		let newRide = {
			trailName: fm.trailName.value,
			bike: fm.bike.value,
			difficulty: fm.difficulty.value,
			trailLength: fm.trailLength.value + " mile(s)",
			trailType: fm.trailType.value
		}
		createRide(newRide);
	});
}

function loadTracker() {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "api/rides");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status < 400) {
				let rides = JSON.parse(xhr.responseText);
				displayRides(rides);
			}
		}
	};
	xhr.send();
}

function displayRides(rides) {
	document.getElementById("ridesTable").textContent = "";
	let table = document.getElementById("ridesTable");
	let tr = document.createElement("tr");
	table.appendChild(tr);
	let tdTrailName = document.createElement("td");
	let tdTrailLength = document.createElement("td");
	let tdBike = document.createElement("td");
	let tdDifficulty = document.createElement("td");
	let tdTrailType = document.createElement("td");
	let tdModify = document.createElement("td");
	tdTrailName.textContent = "Trail Name";
	tdBike.textContent = "Bike Used";
	tdTrailLength.textContent = "Trail Length";
	tdDifficulty.textContent = "Trail Difficulty";
	tdTrailType.textContent = "Trail Type";
	tdModify.textContent = "Modify";
	tr.appendChild(tdTrailName);
	tr.appendChild(tdBike);
	tr.appendChild(tdDifficulty);
	tr.appendChild(tdTrailLength);
	tr.appendChild(tdTrailType);
	tr.appendChild(tdModify);
	let totalMiles = 0;
	for (const ride of rides) {
		console.log(ride);
		let tr = document.createElement("tr");
		let tdTrailName = document.createElement("td");
		let tdTrailLength = document.createElement("td");
		let tdBike = document.createElement("td");
		let tdDifficulty = document.createElement("td");
		let tdTrailType = document.createElement("td");
		let tdDetails = document.createElement("button");
		tdDetails.addEventListener("click", function(e){
			e.preventDefault();
			let newRide = {
				id: ride.id,
				trailName: ride.trailName,
				bike: ride.bike,
				difficulty: ride.difficulty,
				trailLength: ride.trailLength,
				trailType: ride.trailType
			}
			detailView(newRide);
		});
		let tdId = document.createElement('input');
		tdId.type = "hidden";
		tdTrailName.textContent = ride.trailName;
		tdBike.textContent = ride.bike;
		tdTrailLength.textContent = ride.trailLength;
		tdDifficulty.textContent = ride.difficulty;
		tdTrailType.textContent = ride.trailType;
		tdId.value = ride.id;
		console.log(totalMiles + "before")
		totalMiles += parseInt(ride.trailLength);
		console.log(ride.iTrailLength + "value added to total miles");
		console.log(totalMiles + "after");
		tdDetails.textContent = "Details";
		tdDetails.setAttribute('name', 'details');
		tr.appendChild(tdTrailName);
		tr.appendChild(tdBike);
		tr.appendChild(tdDifficulty);
		tr.appendChild(tdTrailLength);
		tr.appendChild(tdTrailType);
		tr.appendChild(tdDetails);
		tr.appendChild(tdId);
		table.appendChild(tr);
	}
	let tMiles = document.createElement('p');
	tMiles.textContent = 'Total Miles: ' + totalMiles;
	console.log(totalMiles);
	table.appendChild(tMiles);
}

function createRide(ride) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/rides');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let newRide = JSON.parse(xhr.responseText);
			} else {
				console.log('Error creating film: ' + xhr.status);
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/json");
	let rideJson = JSON.stringify(ride);
	console.log(rideJson);
	loadTracker();
	xhr.send(rideJson);
	loadTracker();
}

function detailView(ride) {
	document.getElementById('ridesTable').textContent = '';
	let pTrailName = document.createElement('p');
	let pBike = document.createElement('p');
	let pDifficulty = document.createElement('p');
	let pTrailLength = document.createElement('p');
	let pTrailType = document.createElement('p');
	pTrailName.textContent = "Trail Name: " + ride.trailName;
	pBike.textContent = "Bike: " + ride.bike;
	pDifficulty.textContent = "Difficulty: " + ride.difficulty;
	pTrailLength.textContent = "Trail Length: " + ride.trailLength;
	pTrailType.textContent = "Trail Type: " + ride.trailType;

	let table = document.getElementById('ridesTable');
	table.appendChild(pTrailName);
	table.appendChild(document.createElement('br'));
	table.appendChild(pBike);
	table.appendChild(document.createElement('br'));
	table.appendChild(pDifficulty);
	table.appendChild(document.createElement('br'));
	table.appendChild(pTrailLength);
	table.appendChild(document.createElement('br'));
	table.appendChild(pTrailType);
	table.appendChild(document.createElement('br'));

	let edit = document.createElement('button');
	edit.textContent = 'Edit';
	let dele = document.createElement('button');
	dele.textContent = 'Delete';
	edit.addEventListener('click', function(e){
		editRide(ride);
	});
	dele.addEventListener('click', function(e){
		deleteRide(ride);
	});
	table.appendChild(edit);
	table.appendChild(dele);
}

function deleteRide(ride) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/rides/' + ride.id);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status < 400) {
				console.log('Successfully deleted ride!');
			} else {
				console.log('Error deleting ride: ' + xhr.status);
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/json");
	let rideJson = JSON.stringify(ride);
	loadTracker();
	xhr.send(rideJson);
	loadTracker();
}

function editRide(ride) {
	document.getElementById('ridesTable').textContent = '';
	let updateRideForm = document.createElement('form');
	updateRideForm.setAttribute('name', 'updateRideForm');
	let div = document.getElementById('tableFormDiv');

	let lTrailName = document.createElement('label');
	lTrailName.textContent = "Trail Name: "
	let iTrailName = document.createElement('input');
	iTrailName.setAttribute('name', 'trailName');
	iTrailName.setAttribute('value', ride.trailName);
	updateRideForm.appendChild(lTrailName);
	updateRideForm.appendChild(iTrailName);
	updateRideForm.appendChild(document.createElement('br'));

	let lBike = document.createElement('label');
	lBike.textContent = "Bike Used: "
	let iBike = document.createElement('input');
	iBike.setAttribute('name', 'bike');
	iBike.setAttribute('value', ride.bike);
	updateRideForm.appendChild(lBike);
	updateRideForm.appendChild(iBike);
	updateRideForm.appendChild(document.createElement('br'));

	let lDifficulty = document.createElement('label');
	lDifficulty.textContent = "Trail Difficulty: ";
	let sDifficulty = document.createElement('select');
	sDifficulty.setAttribute('name', 'difficulty');
	let oGreen = document.createElement('option');
	oGreen.textContent = 'Green';
	oGreen.setAttribute('value', 'Green');
	sDifficulty.appendChild(oGreen);
	let oBlue = document.createElement('option');
	oBlue.textContent = 'Blue';
	oBlue.setAttribute('value', 'Blue');
	sDifficulty.appendChild(oBlue);
	let oBlack = document.createElement('option');
	oBlack.textContent = 'Black';
	oBlack.setAttribute('value', 'Black');
	sDifficulty.appendChild(oBlack);
	let oDoubleBlack = document.createElement('option');
	oDoubleBlack.textContent = 'Double Black';
	oDoubleBlack.setAttribute('value', 'Double Black');
	sDifficulty.appendChild(oDoubleBlack);
	let oProLine = document.createElement('option');
	oProLine.textContent = 'Pro Line';
	oProLine.setAttribute('value', 'Pro Line');
	sDifficulty.appendChild(oProLine);
	updateRideForm.appendChild(lDifficulty);
	updateRideForm.appendChild(sDifficulty);
	updateRideForm.appendChild(document.createElement('br'));

	let lTrailLength = document.createElement('label');
	lTrailLength.textContent = "Trail Length: "
	let iTrailLength = document.createElement('input');
	iTrailLength.setAttribute('name', 'trailLength');
	iTrailLength.setAttribute('value', ride.trailLength);
	updateRideForm.appendChild(lTrailLength);
	updateRideForm.appendChild(iTrailLength);
	updateRideForm.appendChild(document.createElement('br'));

	let lTrailType = document.createElement('label');
	lTrailType.textContent = "Trail Type: ";
	let sTrailType = document.createElement('select');
	sTrailType.setAttribute('name', 'trailType');
	let oTrail = document.createElement('option');
	oTrail.textContent = 'Trail';
	oTrail.setAttribute('value', 'Trail');
	sTrailType.appendChild(oTrail);
	let oBikePark = document.createElement('option');
	oBikePark.textContent = 'Bike Park';
	oBikePark.setAttribute('value', 'Bike Park');
	sTrailType.appendChild(oBikePark);
	updateRideForm.appendChild(lTrailType);
	updateRideForm.appendChild(sTrailType);
	updateRideForm.appendChild(document.createElement('br'));

	let button = document.createElement('button');
	button.textContent = "Update";
	button.setAttribute('id', 'updateRide');
	button.addEventListener('click', function(e){
		e.preventDefault();
		let updateRide = {
			id: ride.id,
			trailName: iTrailName.value,
			bike: iBike.value,
			difficulty: sDifficulty.value,
			trailLength: iTrailLength.value,
			trailType: sTrailType.value
		}
		editRidePush(updateRide);
		updateRideForm.textContent = '';
	});
	updateRideForm.appendChild(button);
	div.appendChild(updateRideForm);

}

function editRidePush(ride) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/rides');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status < 200) {
				let newRide = JSON.parse(xhr.responseText);
				console.log('Successfully updated ride!');
			} else {
				console.log('Error updating ride: ' + xhr.status);
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/json");
	let rideJson = JSON.stringify(ride);
	loadTracker();
	xhr.send(rideJson);
	loadTracker();
}
