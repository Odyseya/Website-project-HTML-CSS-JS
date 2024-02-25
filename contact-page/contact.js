function validateForm() {
	const name = document.forms["myForm"]["name"].value;
	const email = document.forms["myForm"]["email"].value;
	const phone = document.forms["myForm"]["phone"].value;
	const message = document.forms["myForm"]["comment"].value;

	if (name == "" || name == null) {
		alert("Name must be filled out");
		return false;
	}

	if (name.toLowerCase() == "ironhack") {
		alert("You cannot be Ironhack, because I am Ironhack.");
		return false;
	}

	if (email == "" || email == null) {
		alert("Email must be filled out");
		return false;
	}

	if (phone == "" || phone == null) {
		alert("Phone must be filled out");
		return false;
	}
	// only numeric characters
	if (!/^\d+$/.test(phone)) {
		alert("Only numeric characters allowed in Phone field");
		return false;
	}

	if (message == "" || message == null) {
		alert("Message must be filled out");
		return false;
	}

	if (message.length < 30) {
		alert("Message must have at least 30 letters.");
		return false;
	}

	return true;
}
