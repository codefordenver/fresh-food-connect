import React, {PropTypes} from 'react';
import DataTable from './DataTable';

import {Checkbox} from 'material-ui';

function getDonationSize(number) {
  switch (number) {
    case 0:
      return 'none';

    case 1:
      return 'small';

    case 2:
      return 'medium';

    case 3:
      return 'large';

    default:
      return 'unspecified';
  }
}

export default class CoordinationTable extends React.Component {
  static propTypes = {
    donations: PropTypes.array,
    donors: PropTypes.array,
    locations: PropTypes.array
  }

  constructor(props) {
    super(props);

    this.state = {
      locationsToEmail: {}
    };
  }

  _setSelectedLocations(id, event, sendEmail) {
    this.setState({
      locationsToEmail: {
        ...this.state.locationsToEmail,
        [id]: sendEmail
      }
    });
  }

  getSelectedLocationIds() {
    const {locationsToEmail} = this.state;
    return Object.keys(locationsToEmail)
              .filter(id => locationsToEmail[id] === true)
              .map(id => parseInt(id));
  }

  _getRowData(location) {
    const {donors} = this.props;
    const donor = donors.find(donor => donor.id === location.user_id);
    const associatedDonations = this.props.donations.filter(donation => donation.location_id === location.id);
    associatedDonations.sort((a,b) => a.updated_at > b.updated_at ?  1 :
                                      a.updated_at < b.updated_at ? -1 : 0);

    const latestDonation = associatedDonations[0] || {};

    const {address, city, state, zipcode} = location;

    return {
      'send email': <Checkbox onCheck={this._setSelectedLocations.bind(this, location.id)}/>,
      address,
      city,
      state,
      zipcode,
      'contact email': donor.email,
      'donation confirmed?': latestDonation.size > 0 ? 'yes' : 'no',
      'donation size': getDonationSize(latestDonation.size),
      'donation comments': latestDonation.comments
    };
  }

  render() {
    const {locations} = this.props;
    const data = locations.map(this._getRowData, this);

    return (
      <DataTable showHeaders={true} data={data} />
    );
  }
}
