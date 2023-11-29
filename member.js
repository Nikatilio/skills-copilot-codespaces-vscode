function skillsMember() {
    var skills = document.getElementById("skills");
    var skill = document.createElement("input");
    skill.setAttribute("type", "text");
    skill.setAttribute("name", "skill");
    skill.setAttribute("class", "skills");
    skill.setAttribute("placeholder", "Skill");
    skills.appendChild(skill);
}