"use strict";

const PROJECT_PATH = "projects/";
const PROJECT_IDS = [
    "planetarium_visualization", "distributed_auction_game",
    "adaptive_cruise_control", "parallel_alloy_simulation",
    "des_model_framework", "necessarily_valid_proofs", "auditory_vision",
    "scareflix", "eeg_control_system"
];

async function getProject(projectId) {
    const url = PROJECT_PATH + projectId + ".json";

    const res = await $.ajax({
        dataType: "json",
        url: url
    });

    return res;
}

async function main() {
    $("#projects").append('<div class="ui link centered cards" id="projectCards"></div>');

    const promises = PROJECT_IDS.map(pI => getProject(pI));
    const projectData = await Promise.all(promises);

    projectData.map(p => {
        $("#projectCards").append(createCard(p));

        $("#" + p.id).click(() => {
            $("#" +  p.id + "-modal").modal("show");
        });
    });
}

function monthRange(start, end) {
    if (start === end) {
        return start;
    } else {
        return start + " &mdash; " + end;
    }
}

function createMediaContent(media) {
    if (media.type === "video") {
        return '<video controls>' +
            '<source src="' + media.url + '" type="video/mp4">' +
            '</video>';
    } else if (media.type === "image") {
        return '<div class="image">' +
            '<a href="' + PROJECT_PATH + media.url + '" class="ui image">' +
            '<img src="' + PROJECT_PATH + media.url + '">' +
            '</a>' +
            '</div>';
    } else if (media.type === "presentation" || media.type === "document") {
        const linkUrl = (media.url.local)
            ? PROJECT_PATH + media.url.link
            : media.url.link;
        return '<div class="image">' +
            '<a href="' + linkUrl + '" class="ui image">' +
            '<img src="' + PROJECT_PATH + media.thumbnailUrl + '">' +
            '</a>' +
            '</div>';
    }
    return "";
}

function createMedia(media) {
    const content = createMediaContent(media);

    return '<div class="centered card">' +
        content +
        '<div class="content">' +
        '<div class="header">' + media.title + '</div>' +
        media.description +
        '</div>' +
        '</div>';
}

function createCard(project) {
    const card = [
        '<div class="centered card" id="' + project.id + '">' +
        '<div class="image">' +
        '<img src="' + PROJECT_PATH + project.image + '">' +
        '</div>' +
        '<div class="content">' +
        '<div class="header">' + project.title + '</div>' +
        '<div class="meta">' +
        '<a>' + project.languages.join(", ") + '</a>' +
        '</div>' +
        '<div class="description">' +
        project.shortDescription +
        '</div>' +
        '</div>' +
        '<div class="extra content">' +
        '<span>' +
        monthRange(project.start, project.end) +
        '</span>' +
        '<span class="right floated">' +
        '<i class="user icon"></i>' +
        project.developers.length +
        '</span>' +
        '</div>' +
        '</div>'
    ].join("");

    const links = (project.hasOwnProperty("links")) ?
        ('<tr>' +
            '<td class="modal-table-row-lable">Links</td>' +
            '<td class="modal-table-row-entry">' +
            project.links.map(l => '<a href="' + l.url + '">' + l.title + '</a>').join(", ") +
            '</td>' +
            '</tr>')
        : "";

    const media = (project.hasOwnProperty("media")) ?
        ('<div>' +
            '<h3 class="ui center aligned header">Media</h3>' +
            '<div class="ui centered cards">' +
            project.media.map(createMedia).join("") +
            '</div>' +
            '</div>')
        : "";

    const modal = [
        '<div class="ui modal" id="' + project.id + '-modal">' +
        '<div class="header">' + project.title +
        '</div>' +
        '<div class="content">' +
        '<div>' +
        '<img class="ui medium left floated image modal-image" src="' +
        PROJECT_PATH + project.image + '">' +
        '<div class="modal-table">' +
        '<table>' +

        '<tr>' +
        '<td class="modal-table-row-lable">Developers</td>' +
        '<td class="modal-table-row-entry">' + project.developers.join(", ") + '</td>' +
        '</tr>' +

        '<tr>' +
        '<td class="modal-table-row-lable">Duration</td>' +
        '<td class="modal-table-row-entry">' + monthRange(project.start, project.end) + '</td>' +
        '</tr>' +

        '<tr>' +
        '<td class="modal-table-row-lable">Languages</td>' +
        '<td class="modal-table-row-entry">' + project.languages.join(", ") + '</td>' +
        '</tr>' +

        links +

        '</div>' +
        '</td></tr></table>' +
        '</div>' +
        '<div class="ui clearing divider"></div>' +
        '<div class="modal-main-content">' +
        media +
        '</div>' +
        '<div class="ui hidden divider">' +
        '</div>' +
        '</div>' +
        '</div>'
    ].join("");

    return card + modal;
}

main();
