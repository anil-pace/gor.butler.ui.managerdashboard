import React  from 'react';
import { connect } from 'react-redux';
import Tab from './tabContent';



class GorTabs extends React.Component{
constructor(props, context) {
        super(props, context);
        this.state = {
            activeTabIndex: this.props.defaultActiveTabIndex,
            disabledTabIndex:this.props.disabledTabIndex
        };
        this.handleTabClick = this.handleTabClick.bind(this);
    }
  
    // Toggle currently active tab
    handleTabClick(tabIndex) {
        let activeTabIndex = tabIndex === this.state.activeTabIndex ? this.props.defaultActiveTabIndex : tabIndex
        this.setState({
            activeTabIndex
        });
        if(this.props.onTabClick){
            this.props.onTabClick(activeTabIndex);
        }
    }
  
    // Encapsulate <Tabs/> component API as props for <Tab/> children
    renderChildrenWithTabsApiAsProps() {
        return React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
                onClick : this.handleTabClick,
                tabIndex: index,
                isActive: index === this.state.activeTabIndex,
                disabled: index === this.state.disabledTabIndex
            });
        });
    }
  
    // Render current active tab content
    renderActiveTabContent() {
        const {children} = this.props;
        const {activeTabIndex} = this.state;
        if(children[activeTabIndex]) {
            return children[activeTabIndex].props.children;
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            activeTabIndex: nextProps.defaultActiveTabIndex,
            disabledTabIndex:nextProps.disabledTabIndex
        })
    }
  
    render() {
        return (
            <div className={"tabs"}>
                <ul className={`tabs-nav nav navbar-nav navbar-left ${this.props.tabClass}`}>
                    {this.renderChildrenWithTabsApiAsProps()}
                </ul>
                <div className="tabs-active-content">
                    {this.renderActiveTabContent()}
                </div>
            </div>
        );
    } 
}

export default GorTabs;  

