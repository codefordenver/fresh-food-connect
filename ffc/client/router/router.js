Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('home');
  this.render('header', {to: 'header'});
  this.render('footer', {to: 'footer'});
});

Router.route('/map', function () {
  this.render('map');
  this.render('header', {to: 'header'});
  this.render('footer', {to: 'footer'});
});