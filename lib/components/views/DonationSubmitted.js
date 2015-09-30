import React from 'react';
import {Card} from 'material-ui';
import {Link} from 'react-router';

export default class DonationSubmitted {
  render() {
    return (
      <Card style={{margin: '76px 20px',
                      padding: '20px'}}>
        <h1>Great! Thanks for confirming your donation!</h1>

        <p>
          A cyclist will pick up your veggies
        </p>

        <Link style={{color: 'blue'}} to="/profile">Go to your profile page</Link>
      </Card>
    );
  }
}
