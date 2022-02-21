import { render, screen } from '@testing-library/react';
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import expect from 'expect';
import createRouterContext from 'react-router-test-context';
import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import App from './App';
import Home from './components/Home';
import Offers from './components/Offers';
import Offer from './components/Offer';

configure({ adapter: new Adapter() });

const offer = {
  nid: "13",
  field_company_name: "Loremipsum",
  field_company_website: "http://test.com",
  field_contact_first_name: "Ringo",
  field_contact_last_name: "McCartney",
  field_contact_email: "random@random.com",
  field_contact_phone_no: "+1 212-333-4444",
  field_job_country: "DO",
  field_job_city: "Springfield",
  field_job_application_deadline: "2031-10-02",
  field_job_title: "Dixisset",
  field_job_duration: "3 month",
  field_job_description: "<p>Huius, Lyco, oratione locuples, rebus ipsis ielunior. Duo Reges: constructio interrete. Sed haec in pueris; Sed utrum hortandus es nobis, Luci, inquit, an etiam tua sponte propensus es? Sapiens autem semper beatus est et est aliquando in dolore; Immo videri fortasse. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Et ille ridens: Video, inquit, quid agas;</p>\n",
  field_job_commitment: "Remote",
  field_job_compensation: "Limited compensation",
  field_target_picker: "Public",
  field_target_institution: "",
  field_job_responsibilities: "<p>Huius, Lyco, oratione locuples, rebus ipsis ielunior. Duo Reges: constructio interrete. Sed haec in pueris; Sed utrum hortandus es nobis, Luci, inquit, an etiam tua sponte propensus es? Sapiens autem semper beatus est et est aliquando in dolore; Immo videri fortasse. Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Et ille ridens: Video, inquit, quid agas;</p>\n",
  field_applicant_required_skills: "<p>Quae cum dixisset, finem ille. Quamquam non negatis nos intellegere quid sit voluptas, sed quid ille dicat. Progredientibus autem aetatibus sensim tardeve potius quasi nosmet ipsos cognoscimus. Gloriosa ostentatio in constituendo summo bono. Qui-vere falsone, quaerere mittimus-dicitur oculis se privasse; Duarum enim vitarum nobis erunt instituta capienda. Comprehensum, quod cognitum non habet? Qui enim existimabit posse se miserum esse beatus non erit. Causa autem fuit huc veniendi ut quosdam hinc libros promerem. Nunc omni virtuti vitium contrario nomine opponitur.</p>\n",
  field_placement_status: "Vacant"
};

describe('App', () => {

  let wrapper, context;

  it('renders without crashing', () => {
    render(<App />);
    render(<Home />);
    render(<Offers />);
  });

  it("Offers component with isPublic props equal to false", () => {
    const wrapper = mount(<Offers isPublic={false} />);
    expect(wrapper.props().isPublic).toEqual(false);
  });

  it("Offers component with isPublic props equal to true", () => {
    const wrapper = mount(<Offers isPublic={true} />);
    expect(wrapper.props().isPublic).toEqual(true);
  });

  it("Offers component with isPublic props equal to undefined", () => {
    const wrapper = mount(<Offers />);
    expect(wrapper.props().isPublic).toEqual(undefined);
  });

  it("Render Offer component", () => {
    context = createRouterContext();
    wrapper = mount(<Offer />);
  });
});