/**
 * Created by gaurav.m on 6/21/17.
 */
import React  from 'react';
import {connect} from 'react-redux'
import {addTagToBin} from './../../actions/ppsConfigurationActions'
class Tags extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [{name: "Fragile"}, {name: "Cosmetics"}, {name: "Hangers"}, {name: "Food"}],
            filteredTags: [],
            filter: "",
            canAddTag:false
        }

    }

    componentDidMount() {
        this.setState({filteredTags: this.state.tags})
    }

    searchTags(e) {
        let filteredTags = this.state.tags.filter(function (tag) {
            if (!e.target || !e.target.value || tag.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
                return tag
            }
        })
        if(filteredTags.length===0){
            this.setState({canAddTag:true})
        }else{
            this.setState({canAddTag:false})
        }
        this.setState({filteredTags: filteredTags, filter: e.target.value})
    }

    handleTagSelect(selectedTag,e){
        let self=this
        if(!e.target){
            return false
        }

        let tags=this.state.filteredTags
        tags.forEach(function(tag){
            if(tag.name===selectedTag.name){
                self.props.addTagToBin({tag:tag,bin:self.props.selectedPPSBin})
            }
        })

        this.setState({filteredTags:tags})

    }

    addTag(e){
        let current_state=this.state.tags
        current_state.push({name:this.state.filter})
        this.setState({tags:current_state})
        this.searchTags(e)

    }


    render() {
        let self=this
        return <div className="pps-tags-container">

            <div className="pps-tags-header">Tags</div>
            <div className="pps-searchbox-container">
                <input type="text" onChange={this.searchTags.bind(this)}/>
            </div>

            <div className="pps-searchresult-label">{this.state.filter ? "Search Results" : "All Tags"}</div>
            {this.state.filteredTags.map(function (tag) {
                return <div className="pps-tags-row" key={tag.name}>
                    <span className="pps-tag-name" style={{

                    }}>{tag.name}</span>
                    <span className="pps-tag-selection">
                        {self.props.selectedPPSBin &&  <input checked={self.props.selectedPPSBin.tags.map(function(tag){return tag.name}).indexOf(tag.name)>-1} onClick={self.handleTagSelect.bind(self,tag)} type="checkbox"/>}
                    </span>
                </div>
            })}
            {this.state.canAddTag?<div className="pps-add-tag-container" style={{

            }}>
                    <span className="pps-add-tag-name">{this.state.filter}</span>
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
        selectedPPSBin:state.ppsConfiguration.selectedPPSBin

    };
}

var mapDispatchToProps = function (dispatch) {
    return {
        addTagToBin:function(data){
            dispatch(addTagToBin(data))
        }
    }
};

export  default connect(mapStateToProps, mapDispatchToProps)(Tags);