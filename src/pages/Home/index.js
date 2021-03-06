import React, {Component} from 'react';
import axios from "axios/index";
import {connect} from "react-redux";
import About from './About';
import Slider from '../../components/Slider';
import PostsList from '../../components/PostsList';

import './index.css';
import * as actions from "../../store/actions";

class Home extends Component {
    componentDidMount() {
        const {setArticles, setPopularArticles, setNewArticles} = this.props;

        window.scrollTo(0, 0);
        axios.get('/articles')
            .then(response => {
                setArticles(response.data);
                setPopularArticles(response.data);
                setNewArticles(response.data);
            });
    }

    render() {
        return (
            <React.Fragment>
                <Slider/>
                <About/>
                <PostsList/>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setArticles: articles => dispatch(actions.setArticlesAction(articles)),
        setPopularArticles: articles => dispatch(actions.setPopularArticlesAction(articles)),
        setNewArticles: articles => dispatch(actions.setNewArticlesAction(articles)),
    }
};

export default connect(null, mapDispatchToProps)(Home);