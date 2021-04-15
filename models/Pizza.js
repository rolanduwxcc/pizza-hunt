const { Schema, model }  = require('mongoose');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
    },
    createBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    size: {
      type: String,
      default: "Large",
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

//create teh Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza model
module.exports = Pizza;