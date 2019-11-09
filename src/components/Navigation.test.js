import React from 'react'
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import Navigation from './Navigation'
import {Navbar} from 'react-bootstrap'
import { Link } from 'react-router-dom'

configure({adapter: new Adapter});

describe('<Navigation />', () => {
    it("should have only one navbar", () => {
        const wrapper = shallow(<Navigation />);
        expect(wrapper.find(Navbar)).toHaveLength(1);
    });
    it("should have a least 3 links", () => {
        const wrapper = shallow(<Navigation />);
        expect(wrapper.find(Link).length).toBeGreaterThan(2);
    });
});