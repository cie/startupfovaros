Template.signup.events({
    'click input[type=submit]': function(event){
      event.preventDefault();
      var username = $('#username').val();
      var email = $('#email').val();
      var password = $('#password').val();
      if(!username || !email || !password){
        throwError(i18n('Please fill in all fields'));
        return false;
      }
      Accounts.createUser({
          username: username
        , email: email  
        , password: password
      }, function(err){
        if(err){
          console.log(err);
        }else{
          Router.go('/');
        }  
      });
  },

  'click #signin': function(){
      Router.go('/signin');
  },

  'click .twitter-button': function(){
    Meteor.loginWithTwitter(function(){
      Router.go('/');
    });
  },

  'click .facebook-button': function(){
    Meteor.loginWithFacebook(function(){
      Router.go('/');
    });
  },

  'click .linkedin-button': function(){
    Meteor.loginWithLinkedin(function(){
      Router.go('/');
    });
  }


});
