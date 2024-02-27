function getProjectIdFromURL() {
	const searchParams = window.location.search;
	const params = new URLSearchParams(searchParams);
	return params.get("id");
}

async function fetchAllProjects() {
	try {
		const response = await fetch(
			"https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects"
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Something went wrong!", error);
	}
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

	return othProjects;
}

window.onload = async () => {
	try {
		const id = getProjectIdFromURL();
		const projects = await fetchAllProjects();
		const projectToShow = projects.find((project) => project.uuid === id);
		showProjectData(projectToShow);
		const otherProjects = getOtherProjects(projects, id);
		showOtherProjectData(otherProjects);
	} catch (error) {
		console.error("Error loading project data:", error);
	}
};
