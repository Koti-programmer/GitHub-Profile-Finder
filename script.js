async function getProfile() {
  const username = document.getElementById("username").value;
  const profileDiv = document.getElementById("profile");

  if (!username) {
    profileDiv.innerHTML = "<p>Please enter a GitHub username.</p>";
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();

    profileDiv.innerHTML = `
      <img src="${data.avatar_url}" alt="${data.login}" />
      <h2>${data.name || data.login}</h2>
      <p>${data.bio || "No bio available."}</p>
      <ul style="list-style:none;padding:0;">
        <li><strong>Public Repos:</strong> ${data.public_repos}</li>
        <li><strong>Followers:</strong> ${data.followers}</li>
        <li><strong>Following:</strong> ${data.following}</li>
        <li><strong>Location:</strong> ${data.location || "N/A"}</li>
      </ul>
      <a href="${data.html_url}" target="_blank">View on GitHub</a>
    `;
  } catch (error) {
    profileDiv.innerHTML = `<p>${error.message}</p>`;
  }
}
