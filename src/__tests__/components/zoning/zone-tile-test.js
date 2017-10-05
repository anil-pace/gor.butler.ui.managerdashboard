import React from 'react';
import Zone from '../../../components/systemOverview/zoneTile.js';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

const props = {
      name:"Zone 1",
      id:"1",
      emergencyStatus:true,
      emergencyType:"hard",
      statusText:"STOPPED",
      statusClass:"zoneClearInit",
      status:"zone_clear",
      onZoneClick:function(){

      }
    }

test('Result component should display data correctly', () => {

  const component = renderer.create(
    <Zone 
                    name={props.name}
                    id={props.id}
                    emergencyStatus={props.emergencyStatus}
                    emergencyType={props.emergencyType}
                    statusText={props.statusText}
                    status={props.status}
                    statusClass={props.statusClass}
                    onZoneClick={props.onZoneClick}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
 
});

describe('test zone tile component', () => {
it('renders zone name', () => {
  const wrapper = shallow(<Zone 
                    name={props.name}
                    id={props.id}
                    emergencyStatus={props.emergencyStatus}
                    emergencyType={props.emergencyType}
                    statusText={props.statusText}
                    status={props.status}
                    statusClass={props.statusClass}
                    onZoneClick={props.onZoneClick}/>);
  const zoneName = <p className="zone-name">Zone 1</p>;
  const statusName = <p className="operating-status">STOPPED</p>
  // expect(wrapper.contains(welcome)).to.equal(true);
  expect(wrapper.contains(zoneName)).toEqual(true);
  expect(wrapper.contains(statusName)).toEqual(true);
});
})