async function fetchAllProjects() {
	try {
		const response = await fetch(
			"https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects"
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching projects", error);
	}
}

function getRecentProjects(projects) {
	let recentProjects = projects.reverse().slice(0, 3);
	return recentProjects;
}

function showRecentProjectsData(recentProjects) {
	for (let i = 0; i < recentProjects.length; i++) {
		const uuid = recentProjects[i].uuid;
		const name = recentProjects[i].name;
		const description = recentProjects[i].description;
		const image = recentProjects[i].image;

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
			.setAttribute("href", `projects/project.html?id=${uuid}`);

		document.querySelector(
			`#projects > div > article:nth-child(${
				i + 1
			}) > div.project-image-box`
		).style.backgroundImage = `url('${image}')`;
	}
}

window.onload = async () => {
	try {
		const projects = await fetchAllProjects();
		const recentProjects = getRecentProjects(projects);
		showRecentProjectsData(recentProjects);
	} catch (error) {
		console.error("Error loading project data", error);
	}
};
