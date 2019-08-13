// Packages
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import {
    fetchEventListData,
    fetchEventListKeyword,
    fetchEventListPage,
    fetchEventListLoading
} from "../../actions/eventActions";

// Constants
import { createUrl } from "../../constants/baseConstants";

// Services
import { listEvent } from "../../services/eventServices";

// Styles
import * as Style from "./SearchStyle.js"


class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: props.events.keyword || ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onfetchEventListLoading(true);
        this.props.onfetchEventListData([]);
        listEvent(0, this.state.keyword, (response) => {
            if (response) {
                if (response.statusCode === 200) {
                    if (response.body._embedded && response.body._embedded.events) {
                        this.props.onfetchEventListData(response.body._embedded.events);
                    }
                    if (response.body.page) {
                        this.props.onfetchEventListPage(response.body.page);
                    }
                }
            }
            this.props.onfetchEventListLoading(false);
        });
        this.props.onfetchEventListKeyword(this.state.keyword);
    }

    render() {
        const { keyword } = this.state;

        return (
            <Style.AppWrapper>
                <form onSubmit={this.onSubmit}>
                    <Style.AppInput
                        type="text"
                        placeholder="Filter by name..."
                        name="keyword"
                        value={keyword}
                        onChange={this.onChange}>
                    </Style.AppInput>
                    <Style.AppButtonWrapper className="btn-2 icon-up">
                        <Style.AppButton>Search</Style.AppButton>
                    </Style.AppButtonWrapper>
                </form>
            </Style.AppWrapper>
        )
    }
}


const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = {
    onfetchEventListData: fetchEventListData,
    onfetchEventListKeyword:fetchEventListKeyword,
    onfetchEventListPage: fetchEventListPage,
    onfetchEventListLoading: fetchEventListLoading
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
