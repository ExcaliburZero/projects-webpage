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
      project.start + ' &mdash; ' + project.end +
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
        project.media.map(v => {
            let content;
            if (v.type === "video") {
                content = '<video controls>' +
                    '<source src="' + v.url + '" type="video/mp4">' +
                    '</video>';
            } else if (v.type === "image") {
                content = '<div class="image">' +
                    '<a href="' +  PROJECT_PATH + v.url+ '" class="ui image">' +
                    '<img src="' + PROJECT_PATH + v.url + '">' +
                    '</a>' +
                    '</div>';
            }

            return '<div class="centered card">' +
                content +
                '<div class="content">' +
                '<div class="header">' + v.title + '</div>' +
                v.description +
                '</div>' +
                '</div>'
        }).join("") +
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
        '<td class="modal-table-row-entry">' + project.start + " &mdash; " + project.end + '</td>' +
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
