function Controller(options) {
  this.server = new options.server({ view: options.view });
  this.survey = null;
  this.initialize();
};

Controller.prototype.initialize = function() {
  var that = this;

  $('#login').on('submit', function(e) {
    e.preventDefault();

    var formData = $(this).serialize();
    that.server.authenticateUser(formData);
  });

  $('#container').on('click', 'a.view-survey', function(e) {
    e.preventDefault();

    $(this).addClass('active');
    $('.view-survey').not(this).removeClass('active');

    var id = $(this).attr('id');
    that.server.viewSurvey(id);
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
    that.server.addChoice(formData);
  });

  $('#container').on('click', 'button.add-choice', function(e) {
    e.preventDefault();

    var newChoiceField = 'Choice: <input type="text" name="choice"><br>';
    $(this).before(newChoiceField);
  });

  $('#container').on('submit', '#new-choice-form', function(e) {
    e.preventDefault();

    var question = $(this).prev('h3').text().split(': ').pop();
    var choices = $(this).find('input');
    for (var i = 0; i < choices.length; i++) {
      that.survey.questions[question].push($(choices[i]).val());
    }
    
    that.server.addQuestion({ title: that.survey.title });
  });

  $('#container').on('click', 'button.save-survey', function(e) {
    e.preventDefault();

    var question = $(this).parent().prev('h3').text().split(': ').pop();
    var choices = $(this).parent().find('input');
    for (var i = 0; i < choices.length; i++) {
      that.survey.questions[question].push($(choices[i]).val());
    }
    
    that.server.saveSurvey(that.survey);
  });

  $('#container').on('click', 'button.delete-survey', function(e) {
    e.preventDefault();

    var id = $(this).attr('id');
    that.server.deleteSurvey(id);
  });
}


