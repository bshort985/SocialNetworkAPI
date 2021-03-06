// thought model. 
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utls/date-format");

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
            
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
);

// add a virtual to get the total reaction count
reactionSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
  });

const Thought = model("Thought", thoughtSchema);
module.exports = { Thought };