$(document).ready(function() {
  function updateMainPanel(response) {
    $('#main-panel').html(response);
  }

  $('#login').on('submit', function(e) {
    e.preventDefault();

    // returns hash of form input data
    var formData = $(this).serialize();

    authenticateUser(formData);
  });

  function authenticateUser(formData) {
    var request = $.ajax({
      url: '/login',
      type: 'POST',
      data: formData
    });

    request.done(displayMainPage);
  }

  function displayMainPage(response) {
    $('#container').html(response);
  }

  $('#container').on('click', 'a.view-survey', function(e) {
    e.preventDefault();

    var id = $(this).attr('id');

    viewSurvey(id);
  });

  function viewSurvey(id) {
    var request = $.ajax({
      url: '/survey',
      type: 'POST',
      data: {id: id}
    });

    request.done(updateMainPanel);
  }

  $('#container').on('click', 'button#create-new-survey', function(e) {
    e.preventDefault();

    createSurvey();
  });

  function createSurvey() {
    var request = $.ajax({
      url: '/survey/new',
      type: 'GET',
    });

    request.done(updateMainPanel);
  }

  $('#container').on('submit', '#new-survey-form', function(e) {
    e.preventDefault();

    var formData = $(this).serialize();

    addQuestion(formData);
  });

  function addQuestion(formData) {
    var request = $.ajax({
      url: '/question/new',
      type: 'POST',
      data: formData
    });

    request.done(updateMainPanel);
  }

  $('#container').on('submit', '#new-question-form', function(e){
    e.preventDefault();

    var formData = $(this).serialize();

    addChoice(formData);
  });

  function addChoice(formData){
    var request = $.ajax({
      url: '/choice/new',
      type: 'POST',
      data: formData
    });

    request.done(updateMainPanel);
  }
});
