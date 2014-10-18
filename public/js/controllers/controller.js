function Controller(thisServer) {
  this.server = thisServer;
  this.survey = null;
  this.initialize();
}

Controller.prototype.initialize = function() {
  var that = this;

  $('#container').on('submit', '#login', function(e) {
    e.preventDefault();

    var formData = $(this).serialize();
    that.server.authenticateUser(formData);
    $('#logout').css('visibility', 'visible');
  });

  $('#logout').on('click', function(e) {
    e.preventDefault();

    that.server.logout();
    $('#logout').css('visibility', 'hidden');
  });

  $('#home').on('click', function(e) {
    e.preventDefault();

    that.server.showHome();
  });

  $('#all').on('click', function(e) {
    e.preventDefault();

    that.server.showAllSurveys();
  });

  $('#container').on('click', 'a.view-survey', function(e) {
    e.preventDefault();

    $(this).addClass('active');
    $('.view-survey').not(this).removeClass('active');

    var id = $(this).attr('id');
    that.server.viewSurvey(id);
  });

  $('#container').on('click', 'a.take-survey', function(e) {
    e.preventDefault();

    $(this).addClass('active');
    $('.take-survey').not(this).removeClass('active');

    var id = $(this).attr('id');
    that.server.takeSurvey(id);
  });

  $('#container').on('click', 'button#submit-survey', function(e) {
    e.preventDefault();

    that.server.submitSurvey();
  });

  $('#container').on('click', 'button#create-new-survey', function(e) {
    e.preventDefault();

    that.survey = new Survey();
    that.server.createSurvey();
  });

  $('#container').on('submit', '#new-survey-form', function(e) {
    e.preventDefault();

    var title = $(this).find('input').val();
    that.survey.title = title;

    var formData = $(this).serialize();
    that.server.addQuestion(formData);
  });

  $('#container').on('submit', '#new-question-form', function(e) {
    e.preventDefault();

    var question = $(this).find('input').val();
    that.survey.questions[question] = [];

    var formData = $(this).serialize();
    that.server.addChoices(formData);
  });

  $('#container').on('click', 'button.add-choice', function(e) {
    e.preventDefault();

    var newChoiceField = 'Choice: <input type="text" name="choice"><br>';
    $(this).before(newChoiceField);
  });

  $('#container').on('click', 'button.next-question', function(e) {
    e.preventDefault();

    that.storeQuestionAndChoices(this);
    that.server.addQuestion({ title: that.survey.title });
  });

  $('#container').on('click', 'button.save-survey', function(e) {
    e.preventDefault();

    that.storeQuestionAndChoices(this);
    that.server.saveSurvey(that.survey);
  });

  $('#container').on('click', 'button.delete-survey', function(e) {
    e.preventDefault();

    var id = $(this).attr('id');
    that.server.deleteSurvey(id);
  });
}

Controller.prototype.storeQuestionAndChoices = function(el) {
  var question = $(el).parent().prev('h3').text().split(': ').pop();
  var choices = $(el).parent().find('input');
  for (var i = 0; i < choices.length; i++) {
    this.survey.questions[question].push($(choices[i]).val());
  }
};

