import React, {PropTypes} from 'react';
import {
  Dialog,
  DropDownMenu,
  FlatButton,
  RaisedButton
} from 'material-ui';

export default class SelectPickupDay extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    selectedDay: PropTypes.string.isRequired
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      pickupDay: null
    };
  }

  render() {
    const {selectedDay} = this.props;
    const days = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const menuItems = days.map((day, idx) => ({payload: idx, text: day}));
    const selectedIndex = days.findIndex(day => day === selectedDay) || 0;
    return (
      <div style={{padding: '15px', border: '1px solid #eee'}}>
        Set the pickup day for all locations:
        <DropDownMenu menuItems={menuItems} selectedIndex={selectedIndex} onChange={this._warnAboutChangingDay.bind(this)}/>

        {this._getWarningDialog()}
      </div>
    );
  }

  _cancelDaySelection() {
    this.refs['warning-dialog'].dismiss();
    this.forceUpdate(); // Needed to reset DropDownMenu selection based on props
  }

  _submitDaySelection() {
    this.refs['warning-dialog'].dismiss();
    this.props.onSelect(this.state.pickupDay);
  }

  _getWarningDialog() {
    const customActions = [
      <RaisedButton
        key="cancel"
        label="Cancel"
        secondary={true}
        onTouchTap={this._cancelDaySelection.bind(this)} />,
      <FlatButton
        key="submit"
        label="Submit"
        primary={true}
        onTouchTap={this._submitDaySelection.bind(this)} />
    ];

    return (
      <Dialog
        title="WARNING: Are you sure?"
        actions={customActions}
        ref="warning-dialog"
        modal={true}>
        <p>
          Clicking submit will set the pickup day for every location in the system to the selected day
        </p>
      </Dialog>
    );
  }

  _warnAboutChangingDay(e, selectedIndex, menuItem) {
    this.setState({
      pickupDay: menuItem.text
    });

    this.refs['warning-dialog'].show();
  }
}
