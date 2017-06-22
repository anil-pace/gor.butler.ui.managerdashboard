/**
 * Created by gaurav.m on 6/22/17.
 */
import React  from 'react';

export default class PPSList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [{
                name: "PPS-001",
                profiles: [{name: "default"}, {name: "express", applied: true}, {name: "fast"}, {name: "idle"}]
            }, {
                name: "PPS-002",
                profiles: [{name: "default"}, {name: "express"}, {name: "fast"}, {name: "idle", applied: true}]
            }, {
                name: "PPS-003",
                profiles: [{name: "default", applied: true}, {name: "express"}, {name: "fast"}, {name: "idle"}]
            }]
        }

    }

    selectPPS({pps,profile}) {
        let currentState = this.state.data
        currentState.forEach(function (entry) {
            if (entry.name === pps.name) {
                entry.selected = true
                if (profile) {
                    entry.profiles.forEach(function (prfl) {
                        if (profile.name === prfl.name) {
                            prfl.selected = true
                            prfl.applied = true
                        } else {
                            prfl.selected = false
                            prfl.applied = false
                        }
                    })
                }
            } else {
                entry.selected = false
            }
        })
        this.setState({data: currentState})
    }


    render() {
        let self = this
        return <div style={{
            float: 'left',
            width: '17%',
            border: "1px solid #ccc",
            boxSizing: 'border-box',
            height: 500
        }}>
            <div>
                <div style={{padding: 20, borderBottom: '1px solid #ccc', fontWeight: "bold", fontSize: 18}}>
                    PPS Configurations
                </div>
                <div style={{color: '#999999'}}>
                    {this.state.data.map(function (pps) {
                        return <div key={pps.name} onClick={self.selectPPS.bind(self, {pps:pps})} style={{
                            padding: 20,
                            borderBottom: '1px solid #ccc',
                            background: pps.selected ? '#ccc' : 'transparent',
                            color: pps.selected ? 'white' : 'inherit'
                        }}>
                            <div>
                                {pps.name}
                            </div>
                            <div style={{fontSize: 12, paddingTop: 5}}>
                                {pps.selected && pps.profiles.map(function (profile) {
                                    return <div onClick={self.selectPPS.bind(self, {pps, profile})}
                                                key={profile.name}>
                                        {profile.name} {profile.applied ? "applied" : ''}
                                    </div>

                                })}
                                {!pps.selected && pps.profiles.map(function (profile) {
                                    return profile.applied ?
                                        <div key={profile.name}>{profile.name + " is applied"}</div> : null
                                })}

                            </div>


                        </div>
                    })}

                </div>
            </div>

        </div>
    }
}