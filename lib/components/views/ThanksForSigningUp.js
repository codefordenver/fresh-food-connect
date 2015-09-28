import React from 'react';
import {Card} from 'material-ui';

export default class ThanksForSigningUp extends React.Component {
  render() {
    return (
      <Card style={{margin: '76px 20px',
                    padding: '0 20px'}}>
        <h1>Thanks for signing up!</h1>

        <p>
          We have sent a verification email to the account you provided.
        </p>
      </Card>
    );
  }
}
