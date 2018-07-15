"use strict";

const PROJECT_PATH = "projects/";
const PROJECT_IDS = [
    "planetarium_visualization", "distributed_auction_game",
    "adaptive_cruise_control", "auditory_vision", "eeg_control_system"
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
    $("#projects").append('<div class="ui link centered cards"></div>');

    const projectData = [];
    for (const projectId of PROJECT_IDS) {
        projectData.push(await getProject(projectId));
    }

    projectData.map(p => {
        $("#projects .cards").append(createCard(p));

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

    const modal = [
        '<div class="ui modal" id="' + project.id + '-modal">' +
        '<div class="header">' + project.title +
        '</div>' +
        '<div class="content">' +
        '<img class="ui medium left floated image" src="' +
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

        '</table>' +
        '</div>' +
        project.shortDescription +
        '<div class="ui hidden divider">' +
        '</div>' +
        '</div>' +
        '</div>'
    ].join("");

    return card + modal;
}

main();
