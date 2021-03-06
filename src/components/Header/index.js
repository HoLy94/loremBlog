import React, {Component} from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import classNames from 'classnames';
import {NavLink, Link} from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import './index.css';
import ReactDOM from "react-dom";

class Header extends Component {
    state = {
        isDropDownOpen: false,
        isMobileMenu: false
    };

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    toggleDropDown = () => {
        this.setState((prevState) => ({
            isDropDownOpen: !prevState.isDropDownOpen
        }));
    };
    openMobileMenu = () => {
        document.body.classList.toggle('block-scroll');
        this.setState((prevState) => ({
            isMobileMenu: !prevState.isMobileMenu
        }));
    };
    handleClickOutside = (event) => {
        const domNode = ReactDOM.findDOMNode(this);

        if (!domNode || !domNode.contains(event.target)) {
            this.setState({
                isDropDownOpen: false
            });
        }
    };
    closeMobile = () => {
        if (this.state.isMobileMenu) {
            document.body.classList.remove('block-scroll');
        }
        this.setState({
            isMobileMenu: false
        })
    };

    handleLanguageChange = lng => {
        const {i18n} = this.props;

        i18n.changeLanguage(lng);
    };

    render() {
        const {isDropDownOpen, isMobileMenu} = this.state;
        const {t} = this.props;

        return (
            <header className='header'>
                <Link to="/" className='header_logo'>Lorem<span className='header_logo__red'>Blog</span></Link>
                <nav className={classNames("header_nav nav", {"nav__mobile": isMobileMenu})}>
                    <NavLink
                        to="/"
                        exact
                        className="nav_link"
                        activeClassName="nav_link__active"
                        onClick={this.closeMobile}
                    >{t('home')} </NavLink>
                    <NavLink
                        to="/about"
                        className="nav_link"
                        activeClassName="nav_link__active"
                        onClick={this.closeMobile}
                    >{t('about')} </NavLink>
                    <NavLink
                        to="/portfolio"
                        className="nav_link"
                        activeClassName="nav_link__active"
                        onClick={this.closeMobile}
                    >{t('portfolio')} </NavLink>
                    <a className={classNames("nav_link dropDown", {"dropDown__active": isDropDownOpen})}
                       onClick={this.toggleDropDown}>DropDown
                        <i className="fa fa-sort-down"/>
                        <CSSTransition
                            mountOnEnter
                            unmountOnExit
                            in={isDropDownOpen}
                            timeout={300}
                            classNames={{
                                enterActive: 'dropDown_list__opening',
                                exitActive: 'dropDown_list__closing'
                            }}>
                            <ul className="dropDown_list">
                                <li className='dropDown_item' onClick={this.closeMobile}>Item 1</li>
                                <li className='dropDown_item' onClick={this.closeMobile}>Item 2</li>
                                <li className='dropDown_item' onClick={this.closeMobile}>Item 3</li>
                            </ul>
                        </CSSTransition>
                    </a>
                    <NavLink
                        to="/contacts"
                        className="nav_link"
                        activeClassName="nav_link__active"
                        onClick={this.closeMobile}
                    >{t('contacts')} </NavLink>
                </nav>
                <div className='languages'>
                    <button className='languages_button' onClick={() => this.handleLanguageChange('ua')}>ua</button>
                    /
                    <button className='languages_button' onClick={() => this.handleLanguageChange('en')}>en</button>
                </div>
                <div className={classNames("burger", {"burger__opened": isMobileMenu})}
                     onClick={this.openMobileMenu}>
                    <span className="burger_item"/>
                    <span className="burger_item"/>
                    <span className="burger_item"/>
                </div>
            </header>
        );
    }
}

export default withTranslation()(Header);