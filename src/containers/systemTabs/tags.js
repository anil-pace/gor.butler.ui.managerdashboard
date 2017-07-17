/**
 * Created by gaurav.m on 6/21/17.
 */
import React  from 'react';
import {connect} from 'react-redux'
import {addTagToBin,fetchTags} from './../../actions/ppsConfigurationActions'
import {FETCH_TAGS_URL} from './../../constants/configConstants'
import {GET,FETCH_TAGS,APP_JSON} from './../../constants/frontEndConstants'
class Tags extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            filteredTags: [],
            filter: "",
            canAddTag:false
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tags !== this.state.tags) {
            this.setState({tags: nextProps.tags,filteredTags: nextProps.tags})
        }
    }

    componentDidMount() {
        /**
         * Fetch PPS List
         */
        let data={
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
        let searchedText=(function(e){try{return e.target.value||""}catch(exception){return ""}})(e)
        let exactMatch=false
        let filteredTags = this.state.tags.filter(function (tag) {
            let returnValue = false
            if (!searchedText) {
                exactMatch=true
                returnValue = true
            }

            !returnValue && searchedText.split(" ").forEach(function (word) {
                if (tag.toLowerCase().indexOf(word.toLowerCase())>-1) {
                    returnValue = true
                }
            })

            if(searchedText && searchedText.toLowerCase()===tag.toLowerCase()){
                exactMatch=true
            }
            return returnValue
        })
        this.setState({canAddTag:!exactMatch,filteredTags: filteredTags, filter: searchedText})
    }

    handleTagSelect(selectedTag,e){
        let self=this
        if(!e.target){
            return false
        }

        let tags=this.state.filteredTags
        tags.forEach(function(tag){
            if(tag===selectedTag){
                self.props.addTagToBin({tag:tag,bin:self.props.selectedPPSBin['tags']})
            }
        })

        this.setState({filteredTags:tags})

    }

    addTag(e){
        let current_state=this.state.tags
        current_state.push(this.state.filter)
        this.setState({tags:current_state})
        this.searchTags(e)

    }

    clearSearch(e){
        this.searchTags(e)
    }


    render() {
        let self=this
        if(self.props.tags.length===0){
            return null
        }
        return <div className="pps-tags-container">

            <div className="pps-tags-header"><span className="gor-tag-icon"/>Tags</div>
            <div className="pps-searchbox-container">
                <input placeholder="Enter a tag..." className="pps-searchbox-tags"type="text" onChange={this.searchTags.bind(this)} value={this.state.filter}/>
                {this.state.filter?<span className="searchbox-cross-icon" onClick={this.clearSearch.bind(this)} />:null}
            </div>

            <div className="pps-searchresult-label">{this.state.filter ? "Search Results" : "All Tags"}</div>
            <div className="pps-tag-list">
            {this.state.filteredTags.map(function (tag) {
                return <div className="pps-tags-row" key={tag}>
                    <span className="pps-tag-name">{tag}</span>
                    <span className="pps-tag-selection">
                        {self.props.selectedPPSBin && self.props.selectedPPSBin['tags'] &&  <input checked={self.props.selectedPPSBin['tags'].tags.map(function(tag){return tag}).indexOf(tag)>-1} onChange={self.handleTagSelect.bind(self,tag)} type="checkbox"/>}
                    </span>
                </div>
            })}
            </div>
            {this.state.canAddTag?<div className="pps-add-tag-container">
                    <span className="pps-add-tag-name">"{this.state.filter}"</span>
                <span className="pps-add-tag-button" onClick={this.addTag.bind(this)}>
                        Add
                    </span>
            </div>:null}
        </div>
    }
}
function mapStateToProps(state, ownProps) {
    return {
        selectedProfile:state.ppsConfiguration.selectedProfile||{id:null},
        selectedPPS:state.ppsConfiguration.selectedPPS||{id:null},
        selectedPPSBin:state.ppsConfiguration.selectedPPSBin,
        tags:state.ppsConfiguration.tags||[],
    };
}

var mapDispatchToProps = function (dispatch) {
    return {
        addTagToBin:function(data){
            dispatch(addTagToBin(data))
        },
        fetchTags:function(data){
            dispatch(fetchTags(data))
        }
    }
};

export  default connect(mapStateToProps, mapDispatchToProps)(Tags);