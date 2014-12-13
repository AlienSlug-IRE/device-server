module.exports = function(mongoose){
	var Schema = mongoose.Schema;
	var Device = new Schema({
	    name: {
	    	type: String,
	    	required: true
	    },
	    created: {
	    	type: Date,
	    	default: Date.now
	    },
	    settings:{},
	    config:[],
	    supports:[],
	    active: {
	    	type: Boolean,
	    	default: false
	    }
	});
	return Device;
};