Template.sidebar.helpers( {
	threads: function() {
		return Threads.find();
	},
	userList: function() {
		return userlist;
	}
});