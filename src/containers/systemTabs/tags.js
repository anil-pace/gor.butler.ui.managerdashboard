/**
 * Created by gaurav.m on 6/21/17.
 */
import React  from 'react';
import {connect} from 'react-redux'
import {addTagToBin, fetchTags, addTag} from './../../actions/ppsConfigurationActions'
import {FETCH_TAGS_URL, SAVE_TAGS_URL} from './../../constants/configConstants'
import {GET, FETCH_TAGS, APP_JSON, PUT, ADD_TAG_TO_LIST} from './../../constants/frontEndConstants'
import {FormattedMessage, defineMessages} from 'react-intl'
const messages = defineMessages({
    tagSearchPlaceholder: {
        id: "pps.configuration.tag.search.placeholder",
        defaultMessage: "Enter a tag..."
    }
})
class Tags extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            filteredTags: [],
            filter: "",
            canAddTag: false
        }

    }


    componentWillReceiveProps(nextProps) {
        let self = this
        if (nextProps.tags !== this.state.tags) {
            this.setState({tags: nextProps.tags, filteredTags: nextProps.tags}, function () {
                self.searchTags({target: {value: ''}})
            })

        }
    }

    componentDidMount() {
        /**
         * Fetch PPS List
         */
        let data = {
            'url': FETCH_TAGS_URL,
            'method': GET,
            'cause': FETCH_TAGS,
            'contentType': APP_JSON,
            'accept': APP_JSON,
            'token': this.props.auth_token
        }
        this.props.fetchTags(data)
    }

    searchTags(e) {
        let searchedText = (function (e) {
            try {
                return e.target.value || ""
            } catch (exception) {
                return ""
            }
        })(e)
        let exactMatch = false
        let filteredTags = this.state.tags.filter(function (tag) {
            let returnValue = false
            if (!searchedText) {
                exactMatch = true
                returnValue = true
            }

            !returnValue && searchedText.split(" ").forEach(function (word) {
                if (word && tag.toLowerCase().indexOf(word.toLowerCase()) > -1) {
                    returnValue = true
                }
            })

            if (searchedText && searchedText.toLowerCase() === tag.toLowerCase()) {
                exactMatch = true
            }
            return returnValue
        })
        this.setState({canAddTag: !exactMatch, filteredTags: filteredTags, filter: searchedText})
    }

    handleTagSelect(selectedTag, e) {
        let self = this
        if (!e.target) {
            return false
        }

        let tags = this.state.filteredTags
        tags.forEach(function (tag) {
            if (tag === selectedTag) {
                self.props.addTagToBin({tag: tag, bin: self.props.selectedPPSBin['tags']})
            }
        })

        this.setState({filteredTags: tags})

    }

    addTag(e) {
        /**
         * The API will update the list
         * of tags.
         */
        let data = {
            'url': SAVE_TAGS_URL,
            'method': PUT,
            'cause': ADD_TAG_TO_LIST,
            'formdata': [this.state.filter],
            'contentType': APP_JSON,
            'accept': APP_JSON,
            'token': this.props.auth_token
        }
        this.props.addTag(data)

    }

    clearSearch(e) {
        this.searchTags(e)
    }

    highlightSearchedText(tag) {
        let innerHTML = tag
        this.state.filter && this.state.filter.split(" ").forEach(function (word) {
            let index_of_word = tag.toLowerCase().indexOf(word.toLowerCase())
            if (word && index_of_word >= 0) {
                let re = new RegExp(word, "gi");
                innerHTML = tag.replace(re, ("<span class='highlight'>" + tag.substr(index_of_word, word.length) + "</span>"))
            }
        })

        return innerHTML
    }


    render() {
        let self = this
        if (self.props.tags.length === 0) {
            return null
        }
        return <div className="pps-tags-container">

            <div className="pps-tags-header"><span className="gor-tag-icon"/><FormattedMessage
                id="pps.configuration.tags.label"
                description="Tags"
                defaultMessage="Tags"/></div>
            <div className="pps-searchbox-container">
                <input placeholder={self.context.intl.formatMessage(messages.tagSearchPlaceholder)}
                       className="pps-searchbox-tags" type="text" onChange={this.searchTags.bind(this)}
                       value={this.state.filter}/>
                {this.state.filter ?
                    <span className="searchbox-cross-icon" onClick={this.clearSearch.bind(this)}/> : null}
            </div>

            <div className="pps-searchresult-label">{this.state.filter ?
                <FormattedMessage id="pps.configuration.tags.searchResults.text"
                                  description="Search Results"
                                  defaultMessage="Search Results"/> :
                <FormattedMessage id="pps.configuration.tags.all.text"
                                  description="All Tags"
                                  defaultMessage="All Tags"/>}</div>
            <div className="pps-tag-list">
                {this.state.filteredTags.map(function (tag) {
                    return <div className="pps-tags-row" key={tag}>
                        <span className="pps-tag-name"
                              dangerouslySetInnerHTML={{__html: self.highlightSearchedText.call(self, tag)}}/>
                        <span className="pps-tag-selection">
                        {self.props.selectedPPSBin && self.props.selectedPPSBin['tags'] &&
                        <input checked={self.props.selectedPPSBin['tags'].tags.map(function (tag) {
                            return tag
                        }).indexOf(tag) > -1} onChange={self.handleTagSelect.bind(self, tag)} type="checkbox"/>}
                    </span>
                    </div>
                })}
            </div>
            {this.state.canAddTag ? <div className="pps-add-tag-container">
                <span className="pps-add-tag-name">"{this.state.filter}"</span>
                <span className="pps-add-tag-button" onClick={this.addTag.bind(this)}>
                        <FormattedMessage id="pps.configuration.tags.add.text"
                                          description="Add"
                                          defaultMessage="Add"/>
                    </span>
            </div> : null}
        </div>
    }
}

Tags.contextTypes = {
    intl: React.PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        selectedProfile: state.ppsConfiguration.selectedProfile || {id: null},
        selectedPPS: state.ppsConfiguration.selectedPPS || {id: null},
        selectedPPSBin: state.ppsConfiguration.selectedPPSBin,
        tags: state.ppsConfiguration.tags || [],
    };
}

var mapDispatchToProps = function (dispatch) {
    return {
        addTagToBin: function (data) {
            dispatch(addTagToBin(data))
        },
        fetchTags: function (data) {
            dispatch(fetchTags(data))
        },
        addTag: function (data) {
            dispatch(addTag(data))
        }
    }
};

export  default connect(mapStateToProps, mapDispatchToProps)(Tags);