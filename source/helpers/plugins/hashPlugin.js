import short from 'short-uuid';

const translator = short();

export const hashPlugin = (schema, options) => {
    schema.add({
        hash: {
            type:   String,
            unique: true,
        },
    });

    schema.pre('save', function(next) {
        this.hash = translator.new();
        next();
    });

    if (options && options.index) {
        schema.path('hash').index(true);
    }
};
