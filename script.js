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

// Web-Protect-start//
  document.addEventListener('contextmenu', event => event.preventDefault());

  document.addEventListener('keydown', function (e) {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
      (e.ctrlKey && e.key === 'U')
    ) {
      e.preventDefault();
    }
  });

  // Block Ctrl+U
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key.toLowerCase() === 'u') {
      e.preventDefault();
      alert('Thank you for checking!😁');
    }
  });

// Web-Protect-End//
