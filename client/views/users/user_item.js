Template.user_item.helpers({
  avatarUrl: function(){
    return getAvatarUrl(this);
  },
  createdAtFormatted: function(){
    return this.createdAt ? moment(this.createdAt).fromNow() : '–';
  },
  displayName: function(){
    return getDisplayName(this);
  },
  getEmail: function(){
    return getEmail(this);
  },
  posts: function(){
    return Posts.find({'userId':this._id});
  },
  comments: function(){
    return Comments.find({'userId':this._id});
  },
  userIsAdmin: function(){
    return isAdmin(this);
  },
  getProfileUrl: function () {
    return getProfileUrl(this);
  },
  getKarma: function() {
    return Math.round(100*this.karma)/100;
  },
  getInvitedUserProfileUrl: function () {
    var user = Meteor.users.findOne(this.invitedId);
    return getProfileUrl(user);
  }
});

Template.user_item.events({
  'click .invite-link': function(e, instance){
    e.preventDefault();
    Meteor.call('inviteUser', instance.data._id);
  },
  'click .uninvite-link': function(e, instance){
    e.preventDefault();
    Meteor.users.update(instance.data._id,{
      $set:{
        isInvited: false
      }
    });
  },
  'click .admin-link': function(e, instance){
    e.preventDefault();
    Meteor.users.update(instance.data._id,{
      $set:{
        isAdmin: true
      }
    });
  },
  'click .unadmin-link': function(e, instance){
    e.preventDefault();
    Meteor.users.update(instance.data._id,{
      $set:{
        isAdmin: false
      }
    });
  },
  'click .delete-link': function(e, instance){
    e.preventDefault();
    if(confirm(i18n("Are you sure you want to delete ")+getDisplayName(instance.data)+"?"))
      Meteor.users.remove(instance.data._id);
  }
})
