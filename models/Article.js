import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    slug: {type: String, lowercase: true, unique: true},
    title: {type: String, unique: true, required: [true, "Title cannot be empty."]},
    description: {type: String},
    body: String,
    tagList: [{type: String}],
    favoritesCount: {type: Number, default: 0},
    author: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
}, {timestamps: true});

ArticleSchema.plugin(uniqueValidator, {message: "is already taken."});

ArticleSchema.methods.slugify = function () {
  this.slug = slug(this.article) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

ArticleSchema.pre('validate', function (next) {
    if(!this.slug){
        this.slugify();
    }

    return next();
})

ArticleSchema.methods.toJSONFor = function(user){
    return {
        slug: this.slug,
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList,
        favoritesCount: this.favoritesCount,
        favorited: user ? user.isFavorite(this._id) : false,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        author: user
    };
};

export default mongoose.model("Article", ArticleSchema);

