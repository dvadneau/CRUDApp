import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {

    static contextTypes = {

        router: PropTypes.object
    };

    onSubmit(props) {

        this.props.createPost(props)
            .then(() => {
               /*
                blog post has been created, navigate the user to the index.
                We navigate by calling this.context.router.push with the
                new path to which to navigate.
                 */
               this.context.router.push('/');
            });
    }

    render() {

        //const handleSubmit = this.props.handleSubmit;
        // const title = this.props.fields.title;
        const { fields: { title, categories, content }, handleSubmit } = this.props;

        return (

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create A New Post</h3>

                <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
                    <label>Title</label>
                    <input type="text" className="form-control" {...title} />
                    <div className="text-help">
                        {title.touched ? title.error : ''}
                    </div>
                </div>

                <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories} />
                    <div className="text-help">
                        {categories.touched ? categories.error : ''}
                    </div>
                </div>

                <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                    <label>Content</label>
                    <textarea className="form-control" {...content} />
                    <div className="text-help">
                        {content.touched ? content.error : ''}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    };
}

function validate(values) {

    const errors = {};

    if (!values.title) {
        errors.title = 'Enter a username';
    }
    if (!values.categories) {
        errors.categories = 'Enter one or more categories';
    }
    if (!values.content) {
        errors.content = 'Enter some content';
    }
    /*
    Using else if means only the first error is shown. After entering text in that field,
    then the error message for the next field will be shown.
     */

    return errors;
}

/*
 connect: first arg is mapStateToProps, second is mapDispatchToProps
 reduxForm: first is form config, second is mapStateToProps, third is mapDispatchToProps
 */

export default reduxForm({

    form: 'PostsNewForm', // unique token - doesn't have to be the same as our component.
    fields: ['title', 'categories', 'content'],
    validate
}, null, { createPost })(PostsNew);

/*
User types something in .... record it on application state
 */
/*
state === {
    form: { // from reducer
        PostsNewForm: { // name in form prop above
            title: '....',
            categories: '....',
            content: '....'
        }
    }
}
*/
