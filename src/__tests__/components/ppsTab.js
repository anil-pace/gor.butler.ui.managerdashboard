import { MockedProvider } from 'react-apollo/test-utils';
import React from 'react';
import { PPS } from '../../containers/systemTabs/pps/ppsTab';
import { PPS_LIST_QUERY } from '../../containers/systemTabs/pps/queries/ppsTab';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

const mocks = [
  {
    request: {
      query: PPS_LIST_QUERY,
      variables: {
        name: 'Buck',
      },
    },
    result: {
      data:[{
        "pps_profiles": [],
        "pps_id": 4,
        "allowed_modes": ["put", "pick", "audit"],
        "requested_status": null,
        "pps_requested_mode": null,
        "performance": -1,
        "operators_assigned": null,
        "current_task": "put",
        "pps_status": "open"
    }, {
        "pps_profiles": [{
            "applied": false,
            "requested": false,
            "profile_name": "p_test1"
        }, {
            "applied": true,
            "requested": false,
            "profile_name": "default"
        }, {
            "applied": false,
            "requested": false,
            "profile_name": "FMCG"
        }],
        "pps_id": 3,
        "allowed_modes": ["put", "pick", "audit"],
        "requested_status": null,
        "pps_requested_mode": null,
        "performance": -1,
        "operators_assigned": [
            ["admin", "admin"]
        ],
        "current_task": "pick",
        "pps_status": "open"
    }, {
        "pps_profiles": [{
            "applied": true,
            "requested": false,
            "profile_name": "test profile"
        }, {
            "applied": false,
            "requested": false,
            "profile_name": "default"
        }, {
            "applied": false,
            "requested": true,
            "profile_name": "FMCG"
        }],
        "pps_id": 1,
        "allowed_modes": ["put", "pick", "audit"],
        "requested_status": null,
        "pps_requested_mode": null,
        "performance": -1,
        "operators_assigned": null,
        "current_task": "audit",
        "pps_status": "open"
    }, {
        "pps_profiles": [{
            "applied": true,
            "requested": false,
            "profile_name": "new profile"
        }, {
            "applied": false,
            "requested": false,
            "profile_name": "dangerous profile"
        }, {
            "applied": false,
            "requested": true,
            "profile_name": "default"
        }],
        "pps_id": 2,
        "allowed_modes": ["put", "pick", "audit"],
        "requested_status": null,
        "pps_requested_mode": null,
        "performance": -1,
        "operators_assigned": null,
        "current_task": "put",
        "pps_status": "open"
    }],
    },
  },
];

test('PPS component should display data correctly', () => {

  const component = shallow(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PPS />
    </MockedProvider>
  );
  const zoneName = <p className="zone-name">Zone 1</p>;
  const statusName = <p className="operating-status">STOPPED</p>
  // expect(wrapper.contains(welcome)).to.equal(true);
  expect(component.contains(zoneName)).toEqual(true);
  expect(component.contains(statusName)).toEqual(true);
 
});

