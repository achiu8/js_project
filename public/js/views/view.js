function View() {
  var that = this;

  this.displayMainPage = function(response) {
    $('#container').html(response);
  };

  this.updateMainPanel = function(response) {
    $('#main-panel').html(response);
  };

  this.refreshMainAfterSave = function(response) {
    that.displayMainPage(response);
    that.updateMainPanel('<h3>Survey created successfully!</h3>');
  };

  this.refreshMainAfterDelete = function(response) {
    $('#' + response).remove();
    that.updateMainPanel('<h3>Survey deleted.</h3>');
  };

  this.refreshMainAfterSubmit = function(response) {
    that.updateMainPanel('<h3>Survey submitted successfully!</h3>');
  };

}
