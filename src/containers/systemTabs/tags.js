/**
 * Created by gaurav.m on 6/21/17.
 */
import React  from 'react';

export default class Tags extends React.Component {
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
        if(!e.target){
            return false
        }

        let tags=this.state.filteredTags
        tags.forEach(function(tag){
            if(tag.name===selectedTag.name){
                tag.checked=e.target.checked
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
        return <div style={{
            float: 'right',
            width: '20%',
            borderLeft: "1px solid #ccc",
            boxSizing: 'border-box',
            height: 450
        }}>

            <div style={{
                margin: 15,
                borderBottom: "1px solid #ccc",
                boxSizing: 'border-box',
                fontWeight: "bold",
                fontSize: 16,
                color: '#999',
                paddingBottom: 15
            }}>Tags
            </div>
            <div style={{margin: 15, fontSize: 12}}>
                <input type="text" onChange={this.searchTags.bind(this)}/>
            </div>

            <div style={{margin: 15}}>{this.state.filter ? "Search Results" : "All Tags"}</div>
            {this.state.filteredTags.map(function (tag) {
                return <div key={tag.name} style={{
                    marginLeft: 15,
                    marginRight: 15,
                    paddingBottom: 5,
                    color: '#999',
                    fontSize: 12,
                    clear: 'both',
                    overflow: 'auto'
                }}>
                    <span style={{
                        padding: 5,
                        border: "1px solid #ccc",
                        borderRadius: 10,
                        float: 'left'
                    }}>{tag.name}</span>
                    <span style={{float: "right"}}>
                        <input checked={tag.checked} onClick={self.handleTagSelect.bind(self,tag)} type="checkbox"/>
                    </span>
                </div>
            })}
            {this.state.canAddTag?<div style={{
                marginLeft: 15,
                marginRight: 15,
                paddingBottom: 5,
                color: '#999',
                fontSize: 12,
                clear: 'both',
                overflow: 'auto'
            }}>
                    <span style={{
                        float: 'left'
                    }}>{this.state.filter}</span>
                <span onClick={this.addTag.bind(this)} style={{float: "right"}}>
                        Add
                    </span>
            </div>:null}
        </div>
    }
}