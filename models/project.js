module.exports = function(mongoose){
	var Schema = mongoose.Schema;
	var Device = new Schema({
	    name: {
	    	type: String,
	    	required: true
	    },
	    description: {
	    	type: String,
	    	default: 'Tap here to add a description'
	    },
	    created: {
	    	type: Date,
	    	default: Date.now
	    },
	    thumbnail:{
	    	type: String,
	    	default: 'thumbnail.jpg'
	    },
	    devices:[],
	    status: {
	    	type: String,
	    	default: 'Prototype'
	    }
	});
	return Device;
};