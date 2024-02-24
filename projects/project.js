// // •	Using this endpoint, fetch the first three projects of the API to display on the website in the expected position. This API returns the projects in descending order, so you can assume the first item of the array is the last project.
// o	Create a folder named projects with a file named 1.html inside.
// o	Inside this file, you should fetch the API using the onload event. Use MDN - Window: load event if you need help
// o	Filter the project with uuid 1 and print the name, description, content, image and completed_on in the expected position of the page.
// o	Other projects should be other projects of the API. For example, if you are filtering the project with uuid 1, other projects must be others.
// o	BONUS: Take three other projects randomly. If the project does not exist in the API, you should alert the user.
// //

function getProjectIdFromURL() {
	const searchParams = window.location.search;
	const params = new URLSearchParams(searchParams);
	return params.get("id");
}

async function fetchAllProjects() {
	const response = await fetch(
		"https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects"
	);
	const data = await response.json();
	return data;
}

function showProjectData(project) {
	document.querySelector("article.project h1").textContent = project.name;
	document.querySelector("article.project .project-details h5").textContent =
		project.description;
	document.querySelector(
		"body > article > section:nth-child(1) > div > p > span.date"
	).textContent = project.completed_on;
	document.querySelector("body > article > section:nth-child(2) > img").src =
		project.image;
	document.querySelector(
		"body > article > section:nth-child(2) > div > p"
	).innerHTML = project.content;
}

function showOtherProjectData(otherProjects) {
	for (let i = 0; i < otherProjects.length; i++) {
		const uuid = otherProjects[i].uuid;
		const name = otherProjects[i].name;
		const description = otherProjects[i].description;
		const image = otherProjects[i].image;

		document.querySelector(
			`#projects > div > article:nth-child(${
				i + 1
			}) > div.project-text-box > div > h5`
		).textContent = name;

		document.querySelector(
			`#projects > div > article:nth-child(${
				i + 1
			}) > div.project-text-box > div > p`
		).textContent = description;

		document
			.querySelector(
				`#projects > div > article:nth-child(${
					i + 1
				}) > div.project-text-box > a`
			)
			.setAttribute("href", `project.html?id=${uuid}`);

		document.querySelector(
			`#projects > div > article:nth-child(${
				i + 1
			}) > div.project-image-box`
		).style.backgroundImage = `url('${image}')`;
	}
}

function getOtherProjects(projects, id) {
	let othProjects = [];

	for (let i = 0; i < projects.length; i++) {
		if (id !== projects[i].uuid) othProjects.push(projects[i]);
	}
	console.log("we are in");
	console.dir(othProjects);
	return othProjects;
}
window.onload = async () => {
	const id = getProjectIdFromURL();
	const projects = await fetchAllProjects();
	const projectToShow = projects.find((project) => project.uuid === id);
	showProjectData(projectToShow);
	const otherProjects = getOtherProjects(projects, id);
	showOtherProjectData(otherProjects);
};
