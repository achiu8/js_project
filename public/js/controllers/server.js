function Server(thisView) {
  this.view = thisView;

  this.authenticateUser = function(formData) {
    var request = $.ajax({
      url: '/login',
      type: 'POST',
      data: formData
    });

    request.done(this.view.displayMainPage);
  };

  this.viewSurvey = function(id) {
    var request = $.ajax({
      url: '/survey',
      type: 'POST',
      data: {id: id}
    });

    request.done(this.view.updateMainPanel);
  };

  this.createSurvey = function() {
    var request = $.ajax({
      url: '/survey/new',
      type: 'GET',
    });

    request.done(this.view.updateMainPanel);
  };

  this.addQuestion = function(formData) {
    var request = $.ajax({
      url: '/question/new',
      type: 'POST',
      data: formData
    });

    request.done(this.view.updateMainPanel);
  };

  this.addChoices = function(formData) {
    var request = $.ajax({
      url: '/choices/new',
      type: 'POST',
      data: formData
    });

    request.done(this.view.updateMainPanel);
  };

  // this.prevChoices = function(formData) {
  //   var request = $.ajax({
  //     url: '/choices/prev',
  //     type: 'POST',
  //     data: formData
  //   });

  //   request.done(this.view.updateMainPanel);
  // };

  this.saveSurvey = function(survey) {
    var request = $.ajax({
      url: '/survey/save',
      type: 'POST',
      data: survey
    });

    request.done(this.view.refreshMainAfterSave);
  };

  this.deleteSurvey = function(id) {
    var request = $.ajax({
      url: '/survey',
      type: 'DELETE',
      data: {id: id}
    });

    request.done(this.view.refreshMainAfterDelete);
  };
}
