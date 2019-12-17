/**
 * Created by gaurav.m on 6/21/17.
 */
import React from "react"
import { FormattedMessage, defineMessages } from "react-intl"
const messages = defineMessages({
  tagSearchPlaceholder: {
    id: "pps.configuration.tag.search.placeholder",
    defaultMessage: "Enter a tag..."
  }
})
import { graphql, withApollo, compose } from "react-apollo"
import gql from "graphql-tag"

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
      this.setState(
        { tags: nextProps.tags, filteredTags: nextProps.tags },
        function() {
          if (self.state.tags) {
            self.searchTags({ target: { value: "" } })
          }
        }
      )
    }
  }

  searchTags(e) {
    let searchedText = (function(e) {
      try {
        return e.target.value || ""
      } catch (exception) {
        return ""
      }
    })(e)
    let exactMatch = false
    let filteredTags = this.state.tags.filter(function(tag) {
      let returnValue = false
      if (!searchedText) {
        exactMatch = true
        returnValue = true
      }

      !returnValue &&
        searchedText.split(" ").forEach(function(word) {
          if (word && tag.toLowerCase().indexOf(word.toLowerCase()) > -1) {
            returnValue = true
          }
        })

      if (searchedText && searchedText.toLowerCase() === tag.toLowerCase()) {
        exactMatch = true
      }
      return returnValue
    })
    this.setState({
      canAddTag: !exactMatch,
      filteredTags: filteredTags,
      filter: searchedText
    })
  }

  handleTagSelect(selectedTag, e) {
    let self = this
    if (!e.target) {
      return false
    }

    let tags = this.state.filteredTags
    tags.forEach(function(tag) {
      if (tag === selectedTag) {
        self.props.addTagToBin({ tag: tag, bin: self.props.selectedPPSBin })
      }
    })

    this.setState({ filteredTags: tags })
  }

  addTag(e) {
    /**
     * The API will update the list
     * of tags.
     */
    let form_data = { pps_bin_tags: [this.state.filter] }
    this.props.addTags(form_data)
  }

  clearSearch(e) {
    this.searchTags(e)
  }

  highlightSearchedText(tag) {
    let innerHTML = tag
    this.state.filter &&
      this.state.filter.split(" ").forEach(function(word) {
        let index_of_word = tag.toLowerCase().indexOf(word.toLowerCase())
        if (word && index_of_word >= 0) {
          let re = new RegExp(word, "gi")
          innerHTML = tag.replace(
            re,
            "<span class='highlight'>" +
              tag.substr(index_of_word, word.length) +
              "</span>"
          )
        }
      })

    return innerHTML
  }

  render() {
    let self = this
    if (!self.props.tags || self.props.tags.length === 0) {
      return null
    }
    return (
      <div className="pps-tags-container">
        <div className="pps-tags-header">
          <span className="gor-tag-icon" />
          <FormattedMessage
            id="pps.configuration.tags.label"
            description="Tags"
            defaultMessage="Tags"
          />
        </div>
        <div className="pps-searchbox-container">
          <input
            placeholder={self.context.intl.formatMessage(
              messages.tagSearchPlaceholder
            )}
            className="pps-searchbox-tags"
            type="text"
            onChange={this.searchTags.bind(this)}
            value={this.state.filter}
          />
          {this.state.filter ? (
            <span
              className="searchbox-cross-icon"
              onClick={this.clearSearch.bind(this)}
            />
          ) : null}
        </div>

        <div className="pps-searchresult-label">
          {this.state.filter ? (
            <FormattedMessage
              id="pps.configuration.tags.searchResults.text"
              description="Search Results"
              defaultMessage="Search Results"
            />
          ) : (
            <FormattedMessage
              id="pps.configuration.tags.all.text"
              description="All Tags"
              defaultMessage="All Tags"
            />
          )}
        </div>
        <div className="pps-tag-list">
          {this.state.filteredTags.map(function(tag) {
            return (
              <div className="pps-tags-row" key={tag}>
                <span
                  className="pps-tag-name"
                  dangerouslySetInnerHTML={{
                    __html: self.highlightSearchedText.call(self, tag)
                  }}
                />
                <span className="pps-tag-selection">
                  {self.props.selectedPPSBin && (
                    <input
                      checked={
                        self.props.selectedPPSBin.bin_tags
                          .map(function(tag) {
                            return tag
                          })
                          .indexOf(tag) > -1
                      }
                      onChange={self.handleTagSelect.bind(self, tag)}
                      type="checkbox"
                    />
                  )}
                </span>
              </div>
            )
          })}
        </div>
        {this.state.canAddTag ? (
          <div className="pps-add-tag-container">
            <span className="pps-add-tag-name">"{this.state.filter}"</span>
            <span
              className="pps-add-tag-button"
              onClick={this.addTag.bind(this)}
            >
              <FormattedMessage
                id="pps.configuration.tags.add.text"
                description="Add"
                defaultMessage="Add"
              />
            </span>
          </div>
        ) : null}
      </div>
    )
  }
}

Tags.contextTypes = {
  intl: React.PropTypes.object.isRequired
}

/**
 * Mutation to add the selected tag in selected bin
 */
const ADD_TAG_TO_BIN = gql`
  mutation setSelectedBin($state: String!) {
    addTagToSelectedBin(state: $state) @client
  }
`
/**
 * Expose a method to add the selected tag in selected bin.
 * @type {ComponentDecorator<TProps&TGraphQLVariables, TChildProps>}
 */
const withAddTagMutation = graphql(ADD_TAG_TO_BIN, {
  props: ({ mutate, ownProps }) => ({
    addTagToBin: function(state) {
      mutate({ variables: { state: state } })
    }
  })
})

/**
 * Query to fetch Tags list from the server
 */
const TAG_LIST_QUERY = gql`
  query BinTagList {
    BinTagList {
      list
    }
  }
`

/**
 * Will expose a method to fetch the Tag list
 * from the server.
 * @type {ComponentDecorator<TProps&TGraphQLVariables, TChildProps>}
 */
const withQuery = graphql(TAG_LIST_QUERY, {
  props: data => ({
    tags: data.data.BinTagList ? data.data.BinTagList.list : []
  })
})

/**
 * Mutation to add a tag in the tag list
 */
const ADD_TAG_TO_LIST_MUTATION = gql`
  mutation addBinTags($input: AddBinTagInput) {
    addBinTags(input: $input) {
      list
    }
  }
`

/**
 * Will call the server API to add the desired tag in the list
 * and update the Tag List.
 * @type {ComponentDecorator<TProps&TGraphQLVariables, TChildProps>}
 */
const withAddTagToListMutations = graphql(ADD_TAG_TO_LIST_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    addTags: ({ pps_bin_tags }) =>
      mutate({
        variables: { input: { pps_bin_tags } },
        refetchQueries: [{ query: TAG_LIST_QUERY }]
      })
  })
})

export default compose(
  withAddTagMutation,
  withQuery,
  withAddTagToListMutations
)(Tags)
