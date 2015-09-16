Template.accounts.events({
	'click .tab-control': function( e ) {
		e.preventDefault();

		var $this	= $( e.target ),
			tag		= $this.get(0).tagName,
			tIndex	= tag == 'A' ? $this.parents( '.tab-control' ).index() : $this.index();

		$( '.tab-control' ).removeClass( 'tab--visible' );
		$( '.accounts-tab' ).removeClass( 'tab--visible' );

		$this.addClass( 'tab--visible' );
		$( '.accounts-tab' ).eq( tIndex ).addClass( 'tab--visible' );
	},
	'click .log-out': function( e ) {
		e.preventDefault();

		Meteor.logout();
	}
});

Template.register.events({
	'submit form': function( e ) {
		e.preventDefault();

		var username	= $( '#username' ).val(),
			email		= $( '#email' ).val(),
			password	= $( '#password' ).val();

		Accounts.createUser({
			username: username,
			email: email,
			password: password,
		});
	}
});

Template.login.events({
	'submit form': function( e ) {
		e.preventDefault();

		var identifier	= $( '#identifier' ).val(),
			password	= $( '#login-password').val();
			
		Meteor.loginWithPassword( identifier, password );
	}
});