import { render, screen } from '@testing-library/react';
import Enzyme, { configure, mount, shallow } from "enzyme";
/*import Adapter from "@wojtekmaj/enzyme-adapter-react-17";*/
import expect from 'expect';
import createRouterContext from 'react-router-test-context';
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router, BrowserRouter } from 'react-router-dom';

// Import components
import App from './App';
import Home from './components/Home';
import Offers from './components/Offers';
import OfferCard from './components/OfferCard';
import Offer from './components/Offer';

/*Enzyme.configure({ adapter: new Adapter() });*/

const offer = {
  nid: "10",
  field_job_title: "Public PO",
  field_company_name: "Google",
  field_company_website: "https://a.eu",
  field_contact_first_name: "A",
  field_contact_last_name: "A",
  field_contact_email: "a@a.eu",
  field_contact_phone_no: "",
  field_job_country: "HU",
  field_job_city: "Budapest",
  field_job_application_deadline: "2021-11-15",
  field_job_duration: "6 month",
  field_job_description: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut luctus, tortor eget commodo luctus, urna erat commodo sem, id dapibus nisl justo vitae purus. Sed facilisis dui elit, eget dapibus diam eleifend in.</p>\n",
  field_job_commitment: "Part-time",
  field_job_compensation: "No compensation",
  field_target_picker: "Public",
  field_target_institution: "",
  field_job_responsibilities: "<p>a</p>\n",
  field_applicant_required_skills: "<p>a</p>\n",
  field_placement_status: "Vacant"
}

describe('App', () => {

  let context = createRouterContext();

  it('renders without crashing', () => {
    render(<App />);
    render(<Home />, {wrapper: BrowserRouter});
    render(<Offers />, {wrapper: BrowserRouter});
    render(<Offer />, {wrapper: BrowserRouter});
  });

  it("OfferCard component with isPublic props equal to true", () => {
    const component = mount(<Router><OfferCard isPublic={true} offer={offer} /></Router>);
    expect(component.props().children.props.isPublic).toEqual(true);
  });

  it("OfferCard component with isPublic props equal to false", () => {
    let component = mount(<Router><OfferCard isPublic={false} offer={offer} /></Router>);
    expect(component.props().children.props.isPublic).toEqual(false);
  });

  it("OfferCard component with isPublic props equal to undefined", () => {
    let component = mount(<Router><OfferCard isPublic={undefined} offer={offer} /></Router>);
    expect(component.props().children.props.isPublic).toEqual(undefined);
  });

  it("Render Offer component", () => {
    let component = mount(<Offer />);
  });
});