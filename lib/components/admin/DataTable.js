import React, {PropTypes} from 'react';

export default class Admin extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    showHeaders: PropTypes.bool
  }

  render() {
    const {data} = this.props;
    if (!data || data.length < 1) {
      return null;
    }

    const keys = Object.keys(data[0]);
    return (
      <table className="list-table" style={{margin: '10px'}}>
        {this.props.showHeaders &&
          <tr>
            { keys.map(key => <th key={key}>{ key }</th>) }
          </tr>
        }

        { data.map(datum => (
          <tr key={datum.id}>
            {keys.map(key => <td key={key} style={{padding: '10px'}}>{ datum[key] }</td>)}
          </tr>
        )) }
      </table>
    );
  }
}
